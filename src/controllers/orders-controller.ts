import express from 'express';
import { HttpStatusCode } from 'axios';
import sppApi from '../api/spp-api';

const orders = express.Router();

orders.get('/', async (req, res) => {
  const userId = req.query['userId'] as string;
  if (!userId) {
    return res.status(HttpStatusCode.BadRequest).json({message: 'User id is not provided'})
  }
  const folderId = req.query['folderId'] as string;
  const orders = await sppApi.getUserOrders(userId);
  if (!folderId) {
    res.json(orders);
  } else {
    const services = await sppApi.getServices();
    const folderToService: Record<number | string, number[]> = {};
    for (const { service_id } of orders) {
      const service = services.find((s) => s.id === service_id);
      if (!folderToService[service.folder_id]) {
        folderToService[service.folder_id] = [service.id];
      } else {
        folderToService[service.folder_id].push(service.id);
      }
    }
    const filteredServices = folderToService[folderId];
    if (!filteredServices) return res.json([]);
    res.json(orders.filter((o) => filteredServices.includes(o.service_id)));
  }
});

export default orders;