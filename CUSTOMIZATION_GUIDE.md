# 🎂 Love Cake Surprise - Customization Guide

## 🚀 Quick Start
Your app is now running at: **http://localhost:8080**

## 📝 How to Personalize Your App

### 1. **Change Names and Messages**
Edit `src/config/personal.ts` to customize:

```typescript
export const personalConfig = {
  // Change these to your actual names
  herName: "Rizwana", // Her name
  yourName: "Shahin", // Your name
  
  // Update the birthday age
  birthdayAge: 24,
  
  // Customize the birthday message
  birthdayMessage: "I've prepared something special for your 24th birthday. Are you ready for a little adventure filled with love?",
};
```

### 2. **Add Your Personal Images**
1. **Save your photos** in the `public/images/` folder
2. **Name them exactly** as shown below:
   - `you.jpg` - A photo of you
   - `her.jpg` - A photo of her
   - `couple.jpg` - A photo of both of you together
   - `heart.jpg` - A romantic heart image or another special photo

### 3. **Image Requirements**
- **Format**: JPG or PNG
- **Size**: 300x300 pixels or larger (square images work best)
- **Quality**: Clear, well-lit photos
- **Content**: Romantic and appropriate for the birthday surprise!

## 🎮 How the App Works

### **Intro Screen**
- Beautiful welcome with floating hearts
- Personalized birthday message
- "Start My Journey" button

### **Memory Game**
- **4 pairs of cards** (8 total cards)
- **Your photos** will appear when cards are flipped
- **Find matching pairs** to complete the game
- **Track moves** and show progress

### **Other Games**
- **Love Quiz** - Romantic questions
- **Heart Hunt** - Find hidden hearts
- **Love Puzzle** - Solve romantic puzzles

### **Celebration Screen**
- Final surprise after completing all games

## 🛠️ TypeScript vs JavaScript

| **JavaScript** | **TypeScript** |
|---|---|
| `const [state, setState] = useState('intro')` | `const [state, setState] = useState<'intro' \| 'tasks' \| 'celebration'>('intro')` |
| `function handleClick() {}` | `const handleClick = (): void => {}` |
| `props` (any type) | `interface Props { onStart: () => void }` |

## 🎨 Customization Tips

### **Change Colors**
The app uses Tailwind CSS. You can modify colors in `tailwind.config.ts`

### **Add More Games**
Create new game components in `src/components/games/`

### **Modify Messages**
All text is in `src/config/personal.ts` for easy editing

## 🚀 Deployment

When ready to share:
1. Run `npm run build`
2. Upload the `dist` folder to any web hosting service
3. Share the URL with your special someone!

## 💕 Make it Special

- **Add inside jokes** to the messages
- **Use photos** from special moments together
- **Customize the age** and birthday details
- **Add personal touches** to make it unique

## 🔧 Troubleshooting

### **Images not showing?**
- Check file names are exactly correct
- Ensure images are in `public/images/` folder
- Verify image format is JPG or PNG

### **App not loading?**
- Run `npm install` to install dependencies
- Run `npm run dev` to start development server

### **TypeScript errors?**
- The app includes fallbacks for missing images
- All type definitions are included

---

**💖 Enjoy creating this special birthday surprise!** 