import { varchar, pgTable, serial, text } from "drizzle-orm/pg-core";


export const JsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdDate: varchar('createdAt').notNull(),
})