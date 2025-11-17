import server from "./app.setup";
import { connectDB } from "./common/db";

async function bootstrap() {
  try {
    await connectDB().then(() => {
      server.listen(3000, () => {
        console.log(`Server running on PORT 3000`);
      });
    });
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}

bootstrap();
