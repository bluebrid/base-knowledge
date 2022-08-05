; (function () {
    // let el = document.createElement('div')
    // document.body.appendChild(el)
    // setTimeout(function () {
    try {
        eruda.init({
            container: document.querySelector('#eruda'),
            useShadowDom: false,
            // tool:['console'],
            defaults: {
                displaySize: 50,
                transparency: 1,
                theme: 'Monokai Pro',
            },
        })
    } catch (e) {
        alert(e)
    }
    eruda.show().get().config.set('displaySize', 50)
    let entryBtn = eruda.get('entryBtn');
    entryBtn.destroy()
    // const settings = eruda.get('settings')._getSetting('eruda-settings2')
    // settings.config.set('theme', 'Solarized Light')

    eruda.Tool().remove('settings')
    let Console = eruda.get('console');

    // Console._$input[0].replaceWith(Console._$input[0].cloneNode(false));
    Console._$input.on('focusin', () => {
        Console._$inputContainer.rmClass('eruda-active')
        Console._hideInput()
    })
    Console._$input.on('keypress', (event) => {
        if (event.origEvent.key === 'Enter') {
            // Cancel the default action, if needed
            event.origEvent.preventDefault();
            // Trigger the button element with a click
            const $input = Console._$input
            const logger = Console._logger
            const jsInput = $input.val().trim()
            if (jsInput === '') return

            logger.evaluate(jsInput)
            $input.val('')
            Console._hideInput()
        }
    })

    eruda.add(function (eruda) {
        return {
            name: 'close',
            init: function ($el) {
                this._$el = $el
                this._$el.html('This is the new plugin')
            },
        }
    })
    eruda._devTools._navBar._$el.addClass('custom-container')
    const $last = eruda._devTools._navBar._$el.find('.eruda-nav-bar-item ').last()
    $last.addClass('eruda-icon-clear close-btn')
    $last.text('')
    // }, 1000)
})()