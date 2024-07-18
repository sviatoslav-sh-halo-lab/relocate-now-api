import express from 'express';
import sppApi from '../api/spp-api';

const users = express.Router();

users.get('/:id/folder-counters', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = req.params['id'];
  if (!id) {
    return res.status(404).json({ message: 'No id' });
  }

  const apiOrders = await sppApi.getUserOrders(id);
  const orders = apiOrders.map((o) => ({
    id: o.id,
    service_id: o.service_id,
    status: o.status,
  }));
  const services = await sppApi.getServices();
  const servicesIds = new Set(orders.map((o) => o.service_id)) as Set<number>;
  const folderToService = {};
  const serviceToFolder = {};
  for (const serviceId of servicesIds) {
    const service = services.find((s) => s.id === serviceId);
    serviceToFolder[serviceId] = service.folder_id;
    if (!folderToService[service.folder_id]) {
      folderToService[service.folder_id] = [service.id];
    } else {
      folderToService[service.folder_id].push(service.id);
    }
  }

  const result = {};

  for (const k of Object.keys(folderToService)) {
    result[k] = {
      'pending': 0,
      'submitted': 0,
      'in progress': 0,
      'complete': 0,
      'cancelled': 0,
      'stand by': 0,
      'pending dependency': 0,
      'active': 0,
      'waiting ticket reply': 0,
      'extension requested': 0,
    };
  }

  for (const order of orders) {
    const serviceId = order.service_id;
    const folderId = serviceToFolder[serviceId];
    const status = order.status.toLowerCase();
    if (!result[folderId][status]) {
      result[folderId][status] = 1;
    } else {
      result[folderId][status]++;
    }
  }

  res.json(result);
})

export default users;