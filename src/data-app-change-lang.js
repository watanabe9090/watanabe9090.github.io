(() => {
    document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.lang = Intl.DateTimeFormat().resolvedOptions().locale
        const headingTemplate = () => `<p><span class="t-green">yuri@curriculum</span><span class="t-white">:</span><span class="t-blue">~</span>$ whoami</p><p style="text-align: center;user-select: none;margin-top:16px"><img src="assets/me.jpg" width="200" /></p>`
        const sectionsTitleTemplate = (title) => `<p style="text-align: center;margin-top: 2rem">+++ ${title} +++</p><p style="text-align: center;">---------</p>`
        const sectionsBodyTemplate = (rows) => rows.map(row => `<p style="text-align: center;">${row}</p>`).join('')
        const sectionsFooterTemplate = () => `<p style="text-align: center;">=========</p>`
        const cursorTemplate = () => `<p>(END)<span class="cursor">&nbsp;</span></p>`

        let langIndex = 0;
        const handleLangChange = (change) => {
            fetch("info.json", {cache: "force-cache"})
            .then(data => data.json())
            .then(json => {
                if(change) {
                    langIndex = (langIndex+1 >= json.length)? 0: langIndex+1 
                    return json[langIndex]
                } else {
                    const info = json.find(info => info.langs.includes(document.documentElement.lang))
                    return info? info : json.find(info => info.langs.includes("default"))
                }
            })
            .then(data => {
                const heading = headingTemplate();
                const sections = data.sections.map((section) =>  sectionsTitleTemplate(section.title)+
                    sectionsBodyTemplate(section.rows)+
                    sectionsFooterTemplate()
                ).join('');
                const cursor = cursorTemplate();
                document.querySelector(".terminal__body").innerHTML = heading + sections + cursor;
            });
        }

        document.querySelector('[data-app-action="change-language"]').addEventListener("click", () => {
            handleLangChange(true);
        });
        handleLangChange(false);
    })
})();