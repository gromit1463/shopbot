> [!IMPORTANT]
> This project is a work-in-progress

# ShopBot

ShopBot is a handy assistant when you're shopping on a budget.

Before you start your journey through a brick-and-mortar store, set your budget and sales tax rate. As you pick items off the shelves, scan the UPC barcode, set the quantity and unit price, then place the item(s) in your cart.

ShopBot keeps track of your cart total, and shows you how much of your budget you have used so far.

## History

I got this idea about around 2015 when I was grocery shopping with my wife. We needed something to help us stay on budget.

The first version was a simple HTML/CSS/JS app using jQuery.

As we used the app, I thought it would be cool to integrate a barcode scanner to make adding items to the cart faster and easier, rather than manually typing the name of the item every time.

This new version comes from a desire to integrate the technologies I've learned since the first version, along with some newer technologies that I hadn't learned yet.

## Features

- MaterialUI for a beatiful and responsive app, and rapid prototyping
- A barcode scanner to make adding items quick and easy
- Also provides a manual input mode in case the barcode scanner doesn't find the item in the database, or if you just prefer manual input
- A server API is included to query an online UPC database and cache responses in a MongoDB collection

## Tech Stack

This is a monorepo containing the front-end, back-end, and native code.

### Front-End

- Typescript
- Next.js
- Zustand[^1]
- TailwindCSS[^1]
- MaterialUI[^1]
- CapacitorJS (for building iOS/Android apps)
- ZXing ("Zebra Crossing") barcode scanner[^*]

### Back-End

- NodeJS
- ExpressJS
- MongoDB[^1]
- Fetches UPC data from [upcdatabase.org](https://upcdatabase.org/)

I'm also planning on an alternate back-end implementation in Go.

### Infrastructure

- Front- and back-end deployed in Vercel
- MongoDB Atlas (cloud storage)[^1]
- [upcdatabase.org](https://upcdatabase.org/)

[^1]: New-to-me technology
