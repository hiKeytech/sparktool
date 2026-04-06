import type { VideoPlayerProps } from "@/types";

import {
    ActionIcon,
    Button,
    Card,
    Group,
    Progress,
    Stack,
    Text,
} from "@mantine/core";
import {
    IconMaximize,
    IconPlayerPause,
    IconPlayerPlay,
    IconPlayerSkipBack,
    IconPlayerSkipForward,
    IconSettings,
    IconVolume,
    IconVolumeOff,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { formatTime } from "@/utils/date-utils";

/**
 * Universal Video Player Component
 *
 * Supports YouTube, Vimeo, DailyMotion, and direct video URLs
 * Features:
 * - Progress tracking with resume functionality
 * - Completion detection
 * - Custom controls with Nigerian government branding
 * - Responsive design
 * - Accessibility support
 */

interface VideoPlayerState {
  currentTime: number;
  duration: number;
  error?: string;
  isFullscreen: boolean;
  isLoading: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  showControls: boolean;
  volume: number;
}

export function UniversalVideoPlayer({
  autoPlay = false,
  onComplete,
  onProgress,
  onTimeUpdate,
  startTime = 0,
  videoUrl,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null);

  const [state, setState] = useState<VideoPlayerState>({
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    isLoading: true,
    isMuted: false,
    isPlaying: false,
    showControls: true,
    volume: 1,
  });

  // Detect video platform from URL
  const getVideoType = useCallback((url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    }
    if (url.includes("vimeo.com")) {
      return "vimeo";
    }
    if (url.includes("dailymotion.com")) {
      return "dailymotion";
    }
    return "direct";
  }, []);

  // Extract video ID from platform URLs
  const extractVideoId = useCallback((url: string, platform: string) => {
    switch (platform) {
      case "dailymotion":
        const dailymotionMatch = url.match(
          /dailymotion\.com\/video\/([a-zA-Z0-9]+)/
        );
        return dailymotionMatch ? dailymotionMatch[1] : null;
      case "vimeo":
        const vimeoMatch = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
        return vimeoMatch ? vimeoMatch[1] : null;
      case "youtube":
        const youtubeMatch = url.match(
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return youtubeMatch ? youtubeMatch[1] : null;
      default:
        return url;
    }
  }, []);

  // Get embeddable URL for platform videos
  const getEmbedUrl = useCallback(
    (url: string) => {
      const platform = getVideoType(url);
      const videoId = extractVideoId(url, platform);

      if (!videoId) return url;

      switch (platform) {
        case "dailymotion":
          return `https://www.dailymotion.com/embed/video/${videoId}?api=postMessage`;
        case "vimeo":
          return `https://player.vimeo.com/video/${videoId}?api=1`;
        case "youtube":
          return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
        default:
          return url;
      }
    },
    [getVideoType, extractVideoId]
  );

  // Handle play/pause toggle
  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (state.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [state.isPlaying]);


  // Handle mute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    const newMuted = !state.isMuted;
    videoRef.current.muted = newMuted;
    setState((prev) => ({ ...prev, isMuted: newMuted }));
  }, [state.isMuted]);

  // Handle seeking
  const handleSeek = useCallback((newTime: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = newTime;
    setState((prev) => ({ ...prev, currentTime: newTime }));
  }, []);

  // Skip forward/backward
  const skipTime = useCallback(
    (seconds: number) => {
      if (!videoRef.current) return;

      const newTime = Math.max(
        0,
        Math.min(state.duration, state.currentTime + seconds)
      );
      handleSeek(newTime);
    },
    [state.currentTime, state.duration, handleSeek]
  );

  // Show/hide controls
  const showControlsTemporarily = useCallback(() => {
    setState((prev) => ({ ...prev, showControls: true }));

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, showControls: false }));
    }, 3000);
  }, []);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setState((prev) => ({
        ...prev,
        duration: video.duration,
        isLoading: false,
      }));

      // Set start time if provided
      if (startTime > 0 && startTime < video.duration) {
        video.currentTime = startTime;
      }
    };

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration || 0;

      setState((prev) => ({ ...prev, currentTime }));

      // Call progress callback
      if (onProgress && duration > 0) {
        onProgress((currentTime / duration) * 100);
      }

      // Call time update callback
      if (onTimeUpdate) {
        onTimeUpdate(currentTime, duration);
      }
    };

    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };

    const handleEnded = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
      if (onComplete) {
        onComplete();
      }
    };

    const handleError = () => {
      setState((prev) => ({
        ...prev,
        error:
          "Video failed to load. Please check your connection and try again.",
        isLoading: false,
      }));
    };

    // Add event listeners
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [startTime, onProgress, onTimeUpdate, onComplete]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && videoRef.current && !state.isLoading) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, which is expected in many browsers
        console.log("Auto-play prevented by browser");
      });
    }
  }, [autoPlay, state.isLoading]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const platform = getVideoType(videoUrl);
  const progress =
    state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  // Render embedded player for platform videos
  if (platform !== "direct") {
    const embedUrl = getEmbedUrl(videoUrl);

    return (
      <Card
        className="overflow-hidden bg-black"
        p={0}
        radius="lg"
        ref={containerRef}
      >
        <div className="relative aspect-video">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title="Video Player"
          />
        </div>
      </Card>
    );
  }

  // Render direct video player with custom controls
  return (
    <Card
      className="overflow-hidden bg-black"
      p={0}
      radius="lg"
      ref={containerRef}
    >
      <div
        className="relative cursor-pointer aspect-video group"
        onClick={togglePlayPause}
        onMouseEnter={showControlsTemporarily}
        onMouseMove={showControlsTemporarily}
      >
        {/* Video Element */}
        <video
          className="absolute inset-0 object-cover w-full h-full"
          playsInline
          preload="metadata"
          ref={videoRef}
          src={videoUrl}
        />

        {/* Loading State */}
        {state.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-fun-green-600 border-t-transparent animate-spin" />
              <Text className="text-white" size="sm">
                Loading video...
              </Text>
            </div>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="p-6 text-center">
              <Text className="mb-2 text-red-400" size="lg">
                Video Error
              </Text>
              <Text className="text-gray-300" size="sm">
                {state.error}
              </Text>
              <Button
                className="mt-4 bg-fun-green-600 hover:bg-fun-green-700"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!state.isPlaying && !state.isLoading && !state.error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="flex items-center justify-center w-20 h-20 transition-colors rounded-full bg-fun-green-600 hover:bg-fun-green-700">
              <IconPlayerPlay className="ml-1 text-white" size={32} />
            </div>
          </div>
        )}

        {/* Video Controls */}
        {state.showControls && !state.isLoading && !state.error && (
          <div
            className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/70 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <Stack gap="sm">
              {/* Progress Bar */}
              <Progress
                className="cursor-pointer"
                color="fun-green"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percentage = clickX / rect.width;
                  const newTime = percentage * state.duration;
                  handleSeek(newTime);
                }}
                size="sm"
                value={progress}
              />

              {/* Control Buttons */}
              <Group justify="space-between">
                <Group gap="sm">
                  {/* Skip Back */}
                  <ActionIcon
                    className="text-white hover:text-fun-green-400"
                    onClick={() => skipTime(-10)}
                    variant="transparent"
                  >
                    <IconPlayerSkipBack size={20} />
                  </ActionIcon>

                  {/* Play/Pause */}
                  <ActionIcon
                    className="text-white hover:text-fun-green-400"
                    onClick={togglePlayPause}
                    variant="transparent"
                  >
                    {state.isPlaying ? (
                      <IconPlayerPause size={20} />
                    ) : (
                      <IconPlayerPlay size={20} />
                    )}
                  </ActionIcon>

                  {/* Skip Forward */}
                  <ActionIcon
                    className="text-white hover:text-fun-green-400"
                    onClick={() => skipTime(10)}
                    variant="transparent"
                  >
                    <IconPlayerSkipForward size={20} />
                  </ActionIcon>

                  {/* Volume */}
                  <Group gap="xs">
                    <ActionIcon
                      className="text-white hover:text-fun-green-400"
                      onClick={toggleMute}
                      variant="transparent"
                    >
                      {state.isMuted ? (
                        <IconVolumeOff size={20} />
                      ) : (
                        <IconVolume size={20} />
                      )}
                    </ActionIcon>
                  </Group>

                  {/* Time Display */}
                  <Text className="text-white" size="sm">
                    {formatTime(state.currentTime)} /{" "}
                    {formatTime(state.duration)}
                  </Text>
                </Group>

                <Group gap="sm">
                  {/* Settings */}
                  <ActionIcon
                    className="text-white hover:text-fun-green-400"
                    variant="transparent"
                  >
                    <IconSettings size={20} />
                  </ActionIcon>

                  {/* Fullscreen */}
                  <ActionIcon
                    className="text-white hover:text-fun-green-400"
                    onClick={() => {
                      if (containerRef.current) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          containerRef.current.requestFullscreen();
                        }
                      }
                    }}
                    variant="transparent"
                  >
                    <IconMaximize size={20} />
                  </ActionIcon>
                </Group>
              </Group>
            </Stack>
          </div>
        )}
      </div>
    </Card>
  );
}
