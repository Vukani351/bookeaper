# Use Node.js for development
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite uses (default is 5173)
EXPOSE 5173

# Command to run the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
