import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";
import { Platform } from "react-native";
import { useEffect, useRef, useState } from "react";

export interface PushNotificationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotification = (): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false,
        })
    });
    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken>();
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListenter = useRef<Notifications.Subscription>();
    const responseListenter = useRef<Notifications.Subscription>();
    async function registerForPushNotificationAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token");
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });
            if (Platform.OS = "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#fc7b03"
                });
            }
            return token;
        } else {
            console.log("ERROR: Please use a physical device");
        }
    }
    useEffect(() => {
        registerForPushNotificationAsync().then((token) => {
            setExpoPushToken(token);
        });
        notificationListenter.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });
        responseListenter.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListenter.current!
            );
            Notifications.removeNotificationSubscription(
                responseListenter.current!
            );
        }

    }, []);
    return {
        expoPushToken,
        notification
    }
}