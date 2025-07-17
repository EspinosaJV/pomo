import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';
import { QUOTES_API_KEY } from './apikey.js';
const quote_api_url = 'https://api.api-ninjas.com/v1/quotes';

export function getCurrentFormattedDate() {
    return dayjs().format('MMMM D, YYYY');
}

export function getCurrentFormattedTime() {
    return dayjs().format('h:mm A');
}

// TODO: uncomment this for prod cuz dont wanna waste api tokens
// export async function getQuote() {
//     try {
//         const response = await fetch(quote_api_url, {
//             headers: {
//                 'X-Api-Key': QUOTES_API_KEY
//             }
//         }); 

//         const data = await response.json();
//         const { quote, author } = data[0];
//         return { quote, author };
//     } catch (error) {
//         console.error("Failed to fetch quote from Quote API:", error);
//     }
// }