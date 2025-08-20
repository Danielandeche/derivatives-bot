import { useEffect } from 'react';
import { botNotification } from '@/components/bot-notification/bot-notification';
import { APP_IDS } from '@/components/shared/utils/config/config';
import { LocalStorageConstants } from '@deriv-com/utils';

const DEV_SERVER_URL = 'qa197.deriv.dev';
const DEV_APP_ID = APP_IDS.LOCALHOST; // 36300

const useDevMode = () => {
    const switchToDevServer = () => {
        // Show connecting notification first
        botNotification(`Connecting to dev server: ${DEV_SERVER_URL} (Cmd+Shift+D)`, undefined, {
            type: 'info',
            autoClose: 2000,
        });

        // Delay localStorage change to allow snackbar to be read
        setTimeout(() => {
            localStorage.setItem(LocalStorageConstants.configServerURL, DEV_SERVER_URL);
            localStorage.setItem(LocalStorageConstants.configAppId, DEV_APP_ID.toString());

            // Manually reload page to apply server changes
            window.location.reload();
        }, 1500);
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // [AI]
            // Check for Cmd+Shift+D on Mac or Ctrl+Shift+D on Windows/Linux
            const isModifierPressed = event.metaKey || event.ctrlKey;
            const isShiftPressed = event.shiftKey;
            const isDPressed = event.code === 'KeyD';

            if (isModifierPressed && isShiftPressed && isDPressed) {
                event.preventDefault();
                switchToDevServer();
            }
        };

        // Add event listener
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return { switchToDevServer };
};

export default useDevMode;
// [/AI]
