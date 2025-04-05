-- CreateTable
CREATE TABLE "Room" (
    "name" TEXT NOT NULL,
    "accessPassword" TEXT NOT NULL,
    "adminPassword" TEXT NOT NULL,
    "heartCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("name")
);
