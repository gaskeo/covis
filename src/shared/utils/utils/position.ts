const ticketMargin = 10;

export function getTicketPos(
    x: number,
    y: number,
    width: number,
    height: number,
    screenWidth: number,
    screenHeight: number) {
    let left, top;
    if (x < (screenWidth / 2)) {
        left = x + ticketMargin;
    } else {
        left = x - width - ticketMargin;
    }

    if (y < (screenHeight / 2)) {
        top = y + ticketMargin;
    } else {
        top = y - height - ticketMargin;
    }

    return {top: `${top}px`, left: `${left}px`}
}