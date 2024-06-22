import axios from "axios"

export default class SolarisAI {
    /**
     * Create a new SolarisAI Instance
     * 
     * @param {string} api_key The api key that was provided
     */
    constructor(api_key) {
        this.apiKey = api_key
        if (apiKey == undefined || apiKey == null || apiKey == "" || typeof apiKey !== "string") this.apiKey = "";
    }

}