import PushNotification,{Importance} from "react-native-push-notification";

const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'shubham', // (required)
      channelName: 'cobra', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

const showNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'shubham',
    title: title,
    message: message
  })
}

const handleScheduledNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    channelId: 'shubham',
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000)
  })
}

const handleCancelNotification = () => {
  PushNotification.cancelAllLocalNotifications();
}

export {createChannel, showNotification, handleScheduledNotification, handleCancelNotification}
