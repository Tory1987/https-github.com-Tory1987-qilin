import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

// ─── Haptics ───
export async function hapticSuccess() {
  if (!isNative) return;
  const { Haptics, ImpactStyle, NotificationType } = await import('@capacitor/haptics');
  await Haptics.notification({ type: NotificationType.Success });
}

export async function hapticError() {
  if (!isNative) return;
  const { Haptics, NotificationType } = await import('@capacitor/haptics');
  await Haptics.notification({ type: NotificationType.Error });
}

export async function hapticLight() {
  if (!isNative) return;
  const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
  await Haptics.impact({ style: ImpactStyle.Light });
}

export async function hapticMedium() {
  if (!isNative) return;
  const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
  await Haptics.impact({ style: ImpactStyle.Medium });
}

// ─── Camera ───
export async function takePhoto(): Promise<string | null> {
  if (!isNative) return null;
  try {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // lets user choose camera or gallery
      width: 512,
      height: 512,
    });
    return image.dataUrl ?? null;
  } catch {
    return null; // user cancelled
  }
}

// ─── Share ───
export async function shareText(title: string, text: string, url?: string) {
  if (!isNative) {
    // Fallback to Web Share API
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
  try {
    const { Share } = await import('@capacitor/share');
    await Share.share({ title, text, url });
    return true;
  } catch {
    return false;
  }
}

// ─── Local Notifications ───
export async function scheduleStudyReminder(hour: number, minute: number) {
  if (!isNative) return false;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== 'granted') return false;

    // Cancel existing reminder first
    await LocalNotifications.cancel({ notifications: [{ id: 1001 }] });

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1001,
          title: '🐉 Qilin nhắc học!',
          body: 'Đến giờ học tiếng Trung rồi! Duy trì streak nhé 🔥',
          schedule: {
            on: { hour, minute },
            repeats: true,
            allowWhileIdle: true,
          },
          smallIcon: 'ic_notification',
          largeIcon: 'ic_notification',
        },
      ],
    });
    return true;
  } catch (e) {
    console.error('Schedule notification error:', e);
    return false;
  }
}

export async function cancelStudyReminder() {
  if (!isNative) return;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.cancel({ notifications: [{ id: 1001 }] });
  } catch {}
}
