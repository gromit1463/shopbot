**THIS IS A WORK-IN-PROGRESS**

# ShopBot

ShopBot is a handy assistant when you're shopping on a budget.

Before you start your journey through a brick-and-mortar store, set your budget and sales tax rate. As you pick items off the shelves, scan the UPC barcode, set the quantity and unit price, then place the item(s) in your cart.

ShopBot keeps track of your cart total, and shows you how much of your budget you have used so far.

## Features

- MaterialUI for a beatiful and responsive app, and rapid prototyping
- A barcode scanner to make adding items quick and easy
- Also provides a manual input mode in case the barcode scanner doesn't find the item in the database, or if you prefer manual input
- A server API is included to query an online UPC database and cache responses

## Tech Stack

This is a monorepo containing the front-end, back-end, and native code.

### Front-End

- Typescript
- Next.js
- TailwindCSS
- MaterialUI
- CapacitorJS (for building iOS/Android apps)
- Zustand
- ZXing ("Zebra Crossing") barcode scanner

### Back-End

- NodeJS
- ExpressJS
- MongoDB
- Fetches UPC data from [upcdatabase.org](https://upcdatabase.org/)

I'm also planning on an alternate back-end implementation in Go.
