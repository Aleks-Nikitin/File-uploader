-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "fodlerId" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fodlerId_fkey" FOREIGN KEY ("fodlerId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
