# 4MATIC Car Rental

A modern, luxury car rental platform built with Next.js 15, featuring a premium collection of vehicles from top brands like Mercedes, BMW, Lamborghini, Rolls-Royce, and more.

## 🚗 Features

- **Premium Vehicle Collection**: Browse luxury cars, sports cars, SUVs, and economy vehicles
- **Advanced Filtering**: Filter by brand, category, price range, passengers, and year
- **Content Management**: Powered by Contentful CMS for easy content updates
- **Responsive Design**: Optimized for all devices with modern UI/UX
- **Blog Integration**: Built-in blog system for automotive content
- **Dark Mode Support**: Seamless light/dark theme switching
- **Performance Optimized**: Built with Next.js 15 and Turbopack

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **CMS**: Contentful
- **TypeScript**: Full type safety
- **UI Components**: Radix UI primitives
- **Package Manager**: Bun
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Bun (recommended) or npm/yarn
- Contentful account and API keys

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 4matic-car-rental
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Contentful credentials:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
```

4. Run the development server:
```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   │   ├── vehicles/      # Vehicle listing and details
│   │   ├── blog/          # Blog pages
│   │   └── about-us/      # About page
│   └── api/               # API routes
├── components/            # Reusable UI components
├── lib/                   # Utilities and API clients
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── scripts/               # Utility scripts
```

## 🎯 Key Components

### Vehicle Management
- **Dynamic vehicle listings** from Contentful
- **Advanced filtering** by multiple criteria
- **Responsive pagination** with optimized loading
- **Vehicle detail pages** with image galleries

### Content Management
- **Contentful integration** for vehicles, brands, and categories
- **Blog system** with rich text content
- **Image optimization** with Next.js Image component

### UI/UX
- **Modern design** with Tailwind CSS
- **Dark mode support** with theme switching
- **Mobile-first** responsive design
- **Loading states** and error handling

## 📜 Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🏗️ Content Structure

### Contentful Content Types

1. **Rental Vehicle**
   - Vehicle details, pricing, specifications
   - Image galleries and features
   - Brand and category relationships

2. **Car Rental Brand**
   - Brand information and logos
   - URL slugs for filtering

3. **Vehicle Category**
   - Category definitions (Luxury, Sports, SUV, etc.)
   - URL slugs and descriptions

4. **Blog Post**
   - Rich text content with images
   - SEO optimization and metadata

## 🔧 Configuration

### Price Range
- Default max price: **20,000 AED** (includes luxury vehicles)
- Configurable in `car-config.ts`

### Sorting Algorithm
- **Recommended**: Balanced mix of ratings and price tiers
- **Price**: Ascending/descending order
- **Rating**: Highest rated first

### Filtering
- **Brand**: All major luxury and economy brands
- **Category**: Luxury, Sports, SUV, Economy, Minivan
- **Price Range**: Slider with AED currency
- **Passengers**: 2, 4, 5, 6+ options
- **Year Range**: 2020-2025

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

For other platforms, build the application:
```bash
bun build
```

## 📱 Mobile Experience

- Responsive design for all screen sizes
- Touch-optimized filtering modals
- Optimized image loading for mobile networks
- Progressive Web App (PWA) ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software for 4MATIC Car Rental.

## 📞 Support

For technical support or questions, please contact the development team.