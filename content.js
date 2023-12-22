let isEventListenerAttached = false;
const videoContainerClass = '.c-lioqzt';
const roomNameClass = '.live-stream-fullscreen_name__C3TdW';

const rooms = {
    'Dog House': {
        'Kitchen': { x1: 0.44, y1: 0.06, x2: 0.64,y2: 0.57 },
        'Hallway Downstairs': { x1: 0.00, y1: 0.00, x2: 0.26, y2: 0.74 },
    },
    'Hallway Downstairs': {
        'Dog House': { x1: 0.00, y1: 0.00, x2: 0.24, y2: 1.00 },
        'Hallway Upstairs': { x1: 0.52, y1: 0.00, x2: 0.80, y2: 0.89 },
        'Living Room': { x1: 0.81, y1: 0.00, x2: 1.00, y2: 1.00 }
    },
    'Living Room': {
        'Hallway Downstairs': { x1: 0.76, y1: 0.00, x2: 1.00, y2: 1.00 },
        'Lounge': { x1: 0.00, y1: 0.00, x2: 0.22, y2: 0.60 },
        'Bar': { x1: 0.36, y1: 0.00, x2: 0.50, y2: 0.60 }
    },
    'Lounge': {
        'Bar': { x1: 0.50, y1: 0.00, x2: 0.80, y2: 0.50 },
        'Kitchen': { x1: 0.83, y1: 0.00, x2: 1.00, y2: 0.70 },
        'Living Room': { x1: 0.00, y1: 0.71, x2: 1.00, y2: 1.00 }
    },
    'Bar': {
        'Kitchen': { x1: 0.18, y1: 0.00, x2: 0.36, y2: 0.53 },
        'Living Room': { x1: 0.37, y1: 0.00, x2: 0.52, y2: 0.53 },
        'Lounge': { x1: 0.53, y1: 0.00, x2: 0.72, y2: 0.53 }
    },
    'Kitchen': {
        'Bar': { x1: 0.00, y1: 0.71, x2: 1.00, y2: 1.00 },
        'Dog House': { x1: 0.70, y1: 0.00, x2: 1.00, y2: 0.57 }
    },
    'Hallway Upstairs': {
        'Bedroom 2': { x1: 0.00, y1: 0.00, x2: 0.05, y2: 0.64 },
        'Bedroom 1': { x1: 0.05, y1: 0.00, x2: 0.18, y2: 0.64 },
        'Hallway Downstairs': { x1: 0.20, y1: 0.00, x2: 0.48, y2: 0.75 },
        'Bedroom 3': { x1: 0.68, y1: 0.00, x2: 1.00, y2: 1.00 }
    },
    'Bedroom 1': {
        'Hallway Upstairs': { x1: 0.32, y1: 0.00, x2: 0.60, y2: 0.60 }
    },
    'Bedroom 2': {
        'Hallway Upstairs': { x1: 0.36, y1: 0.00, x2: 0.60, y2: 0.50 }
    },
    'Bedroom 3': {
        'The Bunk': { x1: 0.42, y1: 0.00, x2: 0.78, y2: 0.57 },
        'Hallway Upstairs': { x1: 0.79, y1: 0.00, x2: 1.00, y2: 0.57 }
    },
    'The Bunk': {
        'Bedroom 3': { x1: 0.00, y1: 0.00, x2: 0.50, y2: 1.00 }
    }
};

function checkAndAttachEvent() {
    const videoContainer = document.querySelector(videoContainerClass);
    if (videoContainer) {
        if (!isEventListenerAttached) {
            document.body.addEventListener("click", handleDocumentClick);
            isEventListenerAttached = true;
        }

        function handleDocumentClick(event) {
            const videoSelector = document.querySelector(videoContainerClass);
            if (videoSelector.contains(event.target)) {
                const rect = videoSelector.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                const clickedRoom = getClickedRoom(x, y);
                switchRoom(clickedRoom);
            }
        }

        function getCurrentRoom() {
            return document.querySelector(roomNameClass).textContent;
        }

        function getClickedRoom(x, y) {
            const currentRoomName = getCurrentRoom();

            for (const door in rooms[currentRoomName]) {
                const { x1, y1, x2, y2 } = rooms[currentRoomName][door];
                if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                    return door;
                }
            }
            return null;
        }

        function switchRoom(room) {
            console.log(room)
            var buttons = document.querySelectorAll('button');
            buttons.forEach(function(button) {
                var span = button.querySelector('span');
                if (span && span.textContent == room) {
                    button.click();
                }
            });
        }
    }
}

checkAndAttachEvent();
setInterval(checkAndAttachEvent, 2000);