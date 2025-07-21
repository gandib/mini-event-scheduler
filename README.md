# Mini Event Scheduler

Mini Event Scheduler is a lightweight service for adding and viewing events with built-in AI-like categorization. Events are automatically tagged as Work, Personal, or Other based on keywords in the title or notes, enabling smarter and more organized scheduling.

## Live Client URL

- [Live URL](https://mini-event-scheduler-two.vercel.app)

## Live Server URL

- [Live URL](https://mini-event-scheduler-server-henna.vercel.app)

## API Endpoints

- **post /events**: Add new event or reminder. There is a built-in AI-like feature for category selection.
- **get /events**: Retrieve all events using custom sorting with date and time in ascending order.
- **put /events**: Update archived status true.
- **delete /events**: Delete the event permanetly from memory.

## Technologies Used in Server

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.

## Technologies Used in Client

- **Vite for React**: To make frontend very efficient by using React.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: For styling React application.

## Installation

### Clone the repository:

```bash
git clone https://github.com/gandib/mini-event-scheduler
```

### For Server

    ```bash
    cd server
    npm install
    npm run dev
    ```

### Server configuration

Create a .env file in the root directory of server projects and add the necessary configuration variables.

```bash
  NODE_ENV=development
  PORT=5000
```

### For Client

    ```bash
    cd client
    npm install
    npm run dev
    ```

### Client configuration

Create a .env file in the root directory of server projects and add the necessary configuration variables.

```bash
  VITE_BASE_API_URL=backend_url
```
