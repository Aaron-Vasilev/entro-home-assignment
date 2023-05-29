-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "assigneeName" TEXT NOT NULL DEFAULT 'Unassigned',
    "assigneeAvatar" TEXT NOT NULL DEFAULT 'https://entro.security/wp-content/uploads/2023/05/entro-footer-icon.svg',
    "status" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskRelation" (
    "id" INTEGER NOT NULL,
    "relatedTasks" INTEGER[],
    "watchers" TEXT[],

    CONSTRAINT "TaskRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskRelation_id_key" ON "TaskRelation"("id");

-- AddForeignKey
ALTER TABLE "TaskRelation" ADD CONSTRAINT "TaskRelation_id_fkey" FOREIGN KEY ("id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
