function createSprite(selector) {
    let $el = $(selector);
    let frames = [
        'frame1',
        'frame2',
        'frame3',
        'frame4',
        'frame5',
        'frame6',
        'frame7',
        'frame8',
        'frame9'
    ];
    let current = 0;
    let last = frames.length - 1;

    $el.addClass(frames[current]);

    function moveFrame(from, to) {
        $el.removeClass(from)
        .addClass(to);
    }

    function hasNext() {
        return current + 1 <= last;
    }

    function nextFrame() {
        if(hasNext()) {
            moveFrame(frames[current], frames[++current]);
        }
    }

    var reset = function () {
        moveFrame(frames[current], frames[0]);
        current = 0;
    }

    var isFinished = function () {
        return !hasNext();
    }

    return {
        nextFrame: nextFrame,
        reset : reset,
        isFinished : isFinished
    };
}
