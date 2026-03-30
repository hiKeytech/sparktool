import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import type { Certificate } from "@/schemas/certificates";
import { getMongoDb } from "@/server/db/mongo";

type CertificateDocument = Certificate & { _id: string };
export type StoredCertificate = Certificate & { id: string };

function parseStoredCertificate(
  document: CertificateDocument | null,
): null | StoredCertificate {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document._id,
  };
}

async function getCertificateCollection(): Promise<
  Collection<CertificateDocument>
> {
  const db = await getMongoDb();
  return db.collection<CertificateDocument>("certificates");
}

export const certificateRepository = {
  async create(certificateData: Certificate & { id?: string }) {
    const certificates = await getCertificateCollection();
    const certificateId = certificateData.id || randomUUID();
    const document: CertificateDocument = {
      ...certificateData,
      _id: certificateId,
    };

    await certificates.insertOne(document);

    return parseStoredCertificate(document);
  },

  async getById(certificateId?: string) {
    if (!certificateId) {
      return null;
    }

    const certificates = await getCertificateCollection();
    const certificate = await certificates.findOne({ _id: certificateId });

    return parseStoredCertificate(certificate);
  },

  async list(input: { studentId?: string; tenantId?: string }) {
    const certificates = await getCertificateCollection();
    const query: Filter<CertificateDocument> = {};

    if (input.studentId) {
      query.studentId = input.studentId;
    }

    if (input.tenantId) {
      query.tenantId = input.tenantId;
    }

    const sort: Sort = { "issued.at": -1 };

    return (await certificates.find(query).sort(sort).toArray())
      .map((document) => parseStoredCertificate(document))
      .filter(
        (certificate): certificate is StoredCertificate => certificate !== null,
      );
  },

  async update(certificateId: string, updates: Partial<Certificate>) {
    const certificates = await getCertificateCollection();

    await certificates.updateOne(
      { _id: certificateId },
      {
        $set: updates,
      },
    );

    return this.getById(certificateId);
  },
};
