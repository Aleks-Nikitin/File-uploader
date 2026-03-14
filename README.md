# File-uploader
# Cloud File Storage Web App ☁️📁

A full-stack, stripped-down personal cloud storage service built to solidify my backend engineering, database management, and authentication skills. 

This project allows authenticated users to create custom folders, upload files securely to the cloud, view file metadata, and download their stored content. 

**Live Demo:** https://file-uploader-production-4521.up.railway.app

---

## 🚀 Features

* **Secure Authentication:** Session-based user authentication using Passport.js, with sessions securely persisted in the database.
* **Folder Management:** Full CRUD (Create, Read, Update, Delete) capabilities for custom user folders.
* **Cloud File Uploads:** Files are processed via `multer` middleware and uploaded directly to a Supabase storage bucket.
* **Data Validation:** Strict backend validation restricts uploads by specific file types and size limits.
* **File Metadata & Downloads:** Users can click on files to view specific details (name, size, upload timestamp) and download the files to their local machine.
* **Relational Data Mapping:** File URLs and metadata are mapped to specific users and folders within a robust relational database schema.

---

## 🛠️ Tech Stack

* **Backend Framework:** Node.js, Express.js
* **Database & ORM:** PostgreSQL, Prisma
* **Authentication:** Passport.js (Local Strategy), `express-session`, Prisma Session Store
* **File Handling:** Multer
* **Cloud Storage:** Supabase Storage
* **Deployment:** Railway (App & Database hosting)

---

## 📌 Project Status

**Complete / Portfolio Piece**

I built this application as a personal milestone to showcase my progression in full-stack development, specifically focusing on backend architecture, cloud storage integration, and secure data handling. It is a finished project meant for demonstration purposes on my portfolio. I am not actively maintaining this repository.

---

## 💻 Running it Locally

If you'd like to clone and run this project on your local machine to inspect the code:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Aleks-Nikitin/File-uploader.git
   cd File-uploader
   npm install
   ```
2.Environment Variables:
Create a .env file in the root directory and add the necessary connection strings for your own database and Supabase bucket:
DATABASE_URL="postgresql://user:password@localhost:5432/yourdb"
SUPABASE_URL="your_supabase_project_url"
SUPABASE_KEY="your_supabase_api_key"
3. Run prisma migrations and generate client:
  ```bash
  npx prisma migrate dev
  npx prisma generate
  ```
4. Run locally
   ```bash
   npm run dev
   ```
