<div align="center">
  
# 💰 SpendSense AI

<img src="/public/Logo.png" alt="SpendSense AI Logo" width="200" height="60">

**An AI-Powered Financial Management Platform**

*Track, analyze, and optimize your spending with real-time insights*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19_RC-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://spendsense-ai.vercel.app) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/shahRhyme007/spendsense-ai/issues) • [✨ Request Feature](https://github.com/shahRhyme007/spendsense-ai/issues)

</div>

---

## 📸 Preview

<div align="center">
  <img src="/public/banner.jpg" alt="SpendSense AI Dashboard Preview" width="800" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
</div>

### 🎯 **Try It Now - No Installation Required!**

<div align="center">

**Experience SpendSense AI in action with our live demo**

[![Open Live Demo](https://img.shields.io/badge/🚀_Open_Live_Demo-spendsense--ai.vercel.app-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://spendsense-ai.vercel.app)

*Click the button above to explore all features instantly!*

</div>

---

## 🌟 Features

### 💡 **Core Functionality**
- 🎯 **Smart Transaction Tracking** - Automatically categorize and track all your financial transactions
- 📊 **Advanced Analytics** - AI-powered insights into your spending patterns and trends
- 💰 **Multi-Account Support** - Manage multiple bank accounts and credit cards in one place
- 📈 **Budget Planning** - Create and manage intelligent budgets with real-time alerts
- 🔄 **Recurring Transactions** - Set up and track recurring income and expenses
- 📱 **Receipt Scanner** - Extract transaction data from receipts using AI technology

### 🎨 **User Experience**
- ✨ **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🌙 **Dark/Light Mode** - Customizable theme preferences
- 📱 **Mobile-First Design** - Optimized for all devices and screen sizes
- 🚀 **Lightning Fast** - Built with Next.js 15 for optimal performance
- 🔐 **Secure Authentication** - Clerk-powered secure user management

### 📊 **Analytics & Insights**
- 📈 **Expense Breakdown** - Visual pie charts with time period filters (1 month, 6 months, 1 year)
- 📉 **Spending Trends** - Track your financial habits over time
- 🎯 **Category Analysis** - Detailed breakdown by spending categories
- 💼 **Account Overview** - Real-time balance and transaction summaries
- 🔔 **Smart Alerts** - Budget warnings and spending notifications

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19 RC
- **Styling**: Tailwind CSS
- **Components**: Radix UI Primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod Validation

### **Backend**
- **Runtime**: Node.js
- **Database**: PostgreSQL with Supabase
- **ORM**: Prisma
- **Authentication**: Clerk
- **Server Actions**: Next.js Server Components
- **Background Jobs**: Inngest

### **AI & Services**
- **AI Provider**: Google Generative AI (Gemini)
- **Email Service**: Resend
- **Security**: ArcJet (Rate limiting, Bot protection)
- **File Storage**: Supabase Storage
- **Deployment**: Vercel ✅ **[Live at spendsense-ai.vercel.app](https://spendsense-ai.vercel.app)**

### **Development Tools**
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm
- **Linting**: ESLint
- **Version Control**: Git & GitHub

---

## 🏗️ Database Schema

```sql
-- Core Models
User {
  id          String    @id @default(cuid())
  clerkUserId String    @unique
  email       String    @unique
  name        String?
  imageUrl    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  accounts    Account[]
  transactions Transaction[]
  budgets     Budget[]
}

Account {
  id          String    @id @default(cuid())
  name        String
  type        AccountType
  balance     Decimal   @db.Decimal(12, 2)
  isDefault   Boolean   @default(false)
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions Transaction[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

Transaction {
  id                  String    @id @default(cuid())
  type                TransactionType
  amount              Decimal   @db.Decimal(12, 2)
  description         String?
  date                DateTime
  category            String
  receiptUrl          String?
  isRecurring         Boolean   @default(false)
  recurringInterval   RecurringInterval?
  nextRecurringDate   DateTime?
  status              TransactionStatus @default(COMPLETED)
  userId              String
  accountId           String
  user                User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  account             Account   @relation(fields: [accountId], references: [id], onDelete: Cascade)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
}

Budget {
  id          String    @id @default(cuid())
  amount      Decimal   @db.Decimal(12, 2)
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

---

## 🚀 Getting Started

### 🌐 **Quick Start - Try Online**

**Want to test SpendSense AI immediately?** 

👉 **[Visit Live Demo](https://spendsense-ai.vercel.app)** - No setup required!

- ✅ **Instant Access** - Start using the app in seconds
- ✅ **All Features Available** - Experience the complete functionality
- ✅ **No Registration** - Explore without commitment
- ✅ **Mobile Responsive** - Works on any device

---

### 💻 **Local Development Setup**

Want to run SpendSense AI locally or contribute to the project? Follow the steps below:

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **PostgreSQL** database (or Supabase account)
- **Clerk** account for authentication
- **Google AI** API key (for Gemini)

### 🔧 Dependency Compatibility

This project includes a `.npmrc` file that automatically handles peer dependency conflicts between React 19, Next.js 15, and Clerk. The main compatibility updates include:

- **React 19** stable version (updated from RC)
- **Next.js 15.2.3** (compatible with Clerk)
- **react-day-picker 9.1.3** (React 19 compatible)
- **Automatic legacy peer deps** configuration for seamless installation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shahRhyme007/spendsense-ai.git
   cd spendsense-ai
   ```

2. **Install dependencies**
   ```bash
   # Standard installation (now works with .npmrc configuration)
   npm install
   
   # Alternative: Use legacy peer deps explicitly
   npm install --legacy-peer-deps
   
   # Or use the custom script
   npm run install:safe
   
   # Or with yarn
   yarn install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[your_publishable_key]
   CLERK_SECRET_KEY=sk_test_[your_secret_key]
   
   # Supabase Database Configuration
   DATABASE_URL="postgresql://postgres.[your_project_ref]:[your_password]@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
   
   # Direct Database Connection (for migrations)
   DIRECT_URL="postgresql://postgres.[your_project_ref]:[your_password]@aws-0-us-east-2.pooler.supabase.com:5432/postgres"
   
   # Clerk Authentication URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   
   # Google AI API
   GEMINI_API_KEY=[your_gemini_api_key]
   
   # Resend Email Service
   RESEND_API_KEY=re_[your_resend_api_key]
   
   # ArcJet Security
   ARCJET_KEY=[your_arcjet_key]
   
   # Inngest (Background Jobs)
   INNGEST_EVENT_KEY=[your_inngest_event_key]
   INNGEST_SIGNING_KEY=[your_inngest_signing_key]
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
spendsense-ai/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (main)/                   # Main app layout
│   │   ├── 📁 dashboard/             # Dashboard pages
│   │   ├── 📁 transaction/           # Transaction management
│   │   └── 📁 account/               # Account management
│   ├── 📁 api/                      # API routes
│   │   └── 📁 webhooks/              # Webhook handlers
│   └── 📄 globals.css               # Global styles
├── 📁 components/                    # Reusable components
│   ├── 📁 ui/                       # UI primitives
│   ├── 📄 header.jsx                # Navigation header
│   ├── 📄 hero.jsx                  # Landing page hero
│   └── 📄 animated-testimonials.jsx # Testimonials carousel
├── 📁 lib/                          # Utilities and configurations
│   ├── 📄 prisma.js                 # Database client
│   ├── 📄 arcjet.js                 # Security configuration
│   └── 📄 utils.js                  # Helper functions
├── 📁 actions/                      # Server actions
│   └── 📄 dashboard.js              # Dashboard-related actions
├── 📁 data/                         # Static data
│   └── 📄 landing.js                # Landing page content
├── 📁 scripts/                      # Utility scripts
│   ├── 📄 cleanup-user.js           # User cleanup script
│   └── 📄 list-users.js             # User listing script
├── 📁 public/                       # Static assets
│   ├── 📄 logo.png                  # App logo
│   └── 📄 banner.jpg                # Dashboard preview
├── 📄 prisma/schema.prisma          # Database schema
├── 📄 middleware.js                 # Request middleware
├── 📄 tailwind.config.js            # Tailwind configuration
├── 📄 next.config.js                # Next.js configuration
└── 📄 package.json                  # Dependencies
```

---

## 🎯 Key Features Walkthrough

### 🏠 **Dashboard Overview**
- **Account Summary**: View all your accounts with real-time balances
- **Recent Transactions**: Latest 5 transactions with beautiful animations
- **Expense Breakdown**: Interactive pie chart with time period filters
- **Quick Actions**: Easy access to add transactions or create accounts

### 💸 **Transaction Management**
- **Comprehensive List**: View all transactions with advanced filtering
- **Smart Search**: Find transactions by description or category
- **Category Icons**: Visual indicators for different spending categories
- **Sorting Options**: Sort by date, amount, category, or description
- **Pagination**: Handle large transaction volumes efficiently

### 📊 **Analytics & Insights**
- **Time-based Analysis**: Switch between 1 month, 6 months, and 1 year views
- **Category Breakdown**: Understand your spending patterns
- **Visual Charts**: Beautiful, interactive charts powered by Recharts
- **Export Functionality**: Download your financial data

### 🔐 **Security & Performance**
- **Rate Limiting**: ArcJet protection against abuse
- **Bot Detection**: Automatic bot protection
- **Secure Authentication**: Clerk-powered secure login
- **Data Validation**: Zod schema validation for all inputs

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📧 Contact & Support

### 👨‍💻 **Developer**
- **Name**: Shah Arif Rahman Rhyme
- **GitHub**: [@shahRhyme007](https://github.com/shahRhyme007)
- **Email**: [rhymeshah.uta@gmail.com](mailto:rhymeshah.uta@gmail.com)

### 🚀 **Project Links**
- **🌐 Live Demo**: [spendsense-ai.vercel.app](https://spendsense-ai.vercel.app) ⭐ **Try it now!**
- **📱 Repository**: [github.com/shahRhyme007/spendsense-ai](https://github.com/shahRhyme007/spendsense-ai)
- **🐛 Issues**: [Report bugs or request features](https://github.com/shahRhyme007/spendsense-ai/issues)
- **📊 Analytics**: Live performance metrics available in dashboard

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **Clerk** for authentication services
- **Supabase** for database hosting
- **Google** for AI capabilities
- **All Contributors** who helped build this project

---

<div align="center">

### ⭐ Don't forget to star this repository if you found it helpful!

**Made by [Shah Arifur Rahman Rhyme](https://github.com/shahRhyme007)**

*SpendSense AI - Your intelligent financial companion* 💰

</div>
