import { Handler } from "@netlify/functions";
import firestoreService from "../../lib/firebase/firestore-service";

const handler: Handler = async (event, context) => {
  try {
    await firestoreService.deleteAll("wp-plugins", 20);
    return {
      statusCode: 200,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

export { handler };
