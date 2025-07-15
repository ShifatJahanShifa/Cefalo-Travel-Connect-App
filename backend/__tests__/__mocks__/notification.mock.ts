import { notification } from "../../src/types/notifcation.type.ts";

export const mockNotification: notification = {
  notification_id: 'notif-123',
  user_id: 'user1',
  type: 'travel_plan_invite',
  reference_id: 'travel-123',
  read: false
};

export const mockUpdatedNotification: notification = {
  notification_id: 'notif-123',
  user_id: 'user1',
  type: 'travel_plan_invite',
  reference_id: 'travel-123',
  read: true
};
