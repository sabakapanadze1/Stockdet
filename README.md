# Stock Detection App

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/stockdet

   # Better Auth
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000

   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here

   # Email (if using nodemailer)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Inngest (if using)
   INNGEST_EVENT_KEY=your-inngest-event-key
   INNGEST_SIGNING_KEY=your-inngest-signing-key
   ```

### Development

To run the development server:

```bash
npm run dev
```

To run Inngest (for background jobs):

```bash
npx inngest-cli@latest dev
```

### Deployment

For Vercel deployment, make sure to set all environment variables in your Vercel dashboard:

- Go to your project settings
- Navigate to Environment Variables
- Add all the required variables from the `.env.local` example above

### Tech Stack

- Next.js 14
- Better Auth for authentication
- MongoDB for database
- Inngest for background jobs
- Tailwind CSS for styling
