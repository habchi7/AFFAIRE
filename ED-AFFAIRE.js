(function() {
    'use strict';

    // --- SCRIPT1: Fiche Affaire Complet Optimisé ---
    function SCRIPT1() {
        const btn = document.createElement("button");
        btn.innerText = "Éditer la fiche affaire";
        Object.assign(btn.style, {
        padding: "0px 20px",
        background: "#ffffff",
        color: "#007e45",
        border: "none",
        borderRadius: "6px",
        fontWeight: "400",
        cursor: "pointer",
        textAlign: "center",
        marginTop: "10px",
        fontSize: "16px"
        });

        function insertButton() {
            const table = document.querySelector("table.s_pr.swt-tf.swt-vt.s_db");
            if (!table) return false;
            let lastCell = table.querySelector("td.last") || table.querySelector("tr:last-child td:last-child");
            if (lastCell) {
                lastCell.appendChild(btn);
                console.log("✅ Button added inside table.");
                return true;
            }
            return false;
        }

        const observer = setInterval(() => {
            if (insertButton()) clearInterval(observer);
        }, 100);

        function clickLabels() {
            const labels = document.querySelectorAll('label.s_ns.swt-combo-end.swt-edit-combo');
            [1].forEach(index => {
                if (labels.length > index) {
                    ['mousedown', 'mouseup', 'click'].forEach(ev => labels[index].dispatchEvent(new MouseEvent(ev, { bubbles: true, cancelable: true })));
                    console.log(`✅ Label #${index + 1} clicked`);
                }
            });
        }

        function clickDivByText(text) {
            const divs = document.querySelectorAll('div.s_ns.s_f.s_nwrp.s_c_l.s_pa.s-label');
            const div = Array.from(divs).find(d => d.innerText.trim() === text);
            if (div) {
                div.click();
                console.log(`✅ Clicked "${text}"`);
                return true;
            }
            console.warn(`⚠️ "${text}" div not found`);
            return false;
        }

        function clickDivsInOrder(labels, interval = 500, callback) {
            let i = 0;
            const clickNext = () => {
                if (i >= labels.length) { if (callback) callback(); return; }
                if (clickDivByText(labels[i])) i++;
                setTimeout(clickNext, interval);
            };
            clickNext();
        }

        btn.addEventListener("click", () => {
            const inputElements = document.querySelectorAll(
                'input[tabindex="1"][type="text"][autocomplete="off"][class="swtEditDisabled swtEditDisabledTheme s_c_l"][maxlength="32"][readonly]'
            );
            const values = Array.from(inputElements).map(el => el.value);
            console.log("Extracted values:", values);
            const valueToInsert = values[1];
            if (!valueToInsert) return console.warn("⚠️ No value to insert.");

            document.dispatchEvent(new KeyboardEvent("keydown", {
                key: "F9", code: "F9", keyCode: 120, which: 120, bubbles: true
            }));
            console.log("Pressed F9");

            setTimeout(() => {
                const targetInput = document.querySelector(
                    'div.edit-delta-pad.swtEditBorderTheme.swt-combo-space[style*="top: 28px; left: 110px; width: 130px;"] input.s_edit_input.swtFontEdit'
                );
                if (targetInput) { targetInput.value = valueToInsert; console.log("✅ Inserted value:", valueToInsert); }

                clickLabels();

                clickDivsInOrder(["Affaire", "Marchandise"], 500, () => {
                    setTimeout(() => { clickDivByText("Affaire"); }, 2000);

                    const apercuInterval = setInterval(() => {
                        const links = document.querySelectorAll('a.s_dib.s_no.s_pr.s_dbh.s_f.s_fs.s_dbbutton.img-space-24.widget');
                        const apercuLink = Array.from(links).find(a => a.querySelector('span.t1.s_nwrp.s_db')?.textContent.trim() === "Aperçu");
                        if (apercuLink) { apercuLink.click(); console.log("✅ Clicked 'Aperçu'"); clearInterval(apercuInterval); }
                    }, 300);

                });

            }, 300);

        });

    } // End of SCRIPT1

    // --- Detect span and run SCRIPT1 ---
    const interval = setInterval(() => {
        const spans = document.querySelectorAll('span.s_ns.caption-text');
        spans.forEach(span => {
            if (span.textContent.includes("SBP - Fiche de recouvrement Globale")) {
                console.log("✅ Detected 'SBP - Fiche de recouvrement Globale', running SCRIPT1...");
                SCRIPT1();
                clearInterval(interval);
            }
        });
    }, 100);

})();
