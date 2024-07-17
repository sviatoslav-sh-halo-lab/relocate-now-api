import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class SppApi {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.SPP_API,
      headers: {
        Authorization: `Bearer ${process.env.SPP_SECRET}`,
      }
    });
  }

  async getUserOrders(id: string) {
    const data = await this.client.get(`/orders?filters%5Buser_id%5D%5B%24in%5D%5B%5D=${id}`);
    return data.data;
  }

  async getService(id: number | string) {
    const data = await this.client.get(`/services/${id}`);
    return data.data;
  }
}

export default new SppApi();