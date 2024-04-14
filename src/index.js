/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import welcome from "./welcome.html";
const countryGeoJson =  (await import("./data.js")).default;
/**
 * @typedef {Object} Env
 */

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET,OPTIONS",
	"Access-Control-Max-Age": "86400",
}
export default {
	/**
	 * @param {Request} request
	 * @param {Env} env
	 * @param {ExecutionContext} ctx
	 * @returns {Promise<Response>}
	 */
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if(request.method == "OPTIONS")	{
			return new Response("OK", {
				headers: corsHeaders
			  })
		}
		if (url.pathname === "/api" && url.searchParams.has("country") && countryGeoJson.hashmaps.includes(url.searchParams.get("country"))) {
			const countryCode = url.searchParams.get("country")
			return new Response(JSON.stringify(countryGeoJson.features[countryGeoJson.hashmaps.indexOf(countryCode)]),{
				headers:{
				'Content-type': 'application/json',
				...corsHeaders //uses the spread operator to include the CORS headers.
				}  
			});
		}
		return new Response(welcome, {
			headers: {
				"content-type": "text/html",
				...corsHeaders
			},
		});
	},
};
