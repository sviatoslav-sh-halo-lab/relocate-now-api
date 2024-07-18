import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { ServiceDto } from '../dtos/service-dto';

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

  async getUserOrders(id: string, limit?: number): Promise<any[]> {
    const data = await this.client.get(`/orders?limit=${limit ?? 1000}&filters%5Buser_id%5D%5B%24in%5D%5B%5D=${id}`);
    return data.data;
  }

  async getService(id: number | string): Promise<ServiceDto> {
    const data = await this.client.get(`/services/${id}`);
    return data.data;
  }

  async getServices(limit?: number): Promise<ServiceDto[]> {
    const data = await this.client.get(`/services?limit=${limit ?? 1000}`);
    return data.data.data;
  }
}

export default new SppApi();