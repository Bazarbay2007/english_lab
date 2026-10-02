const planButtons = document.querySelectorAll(".plan-btn");
const selectedPlan = document.getElementById("selectedPlan");
const testSection = document.getElementById("test");

planButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const plan = button.dataset.plan;
        const price = button.dataset.price;

        localStorage.setItem("englishLabPlan", JSON.stringify({ plan, price }));
        selectedPlan.textContent = `Выбран тариф: ${plan} — ${price}/месяц`;

        testSection.scrollIntoView({ behavior: "smooth" });
    });
});

const savedPlan = JSON.parse(localStorage.getItem("englishLabPlan") || "null");
if (savedPlan) {
    selectedPlan.textContent = `Выбран тариф: ${savedPlan.plan} — ${savedPlan.price}/месяц`;
}

const levelTest = document.getElementById("levelTest");
const result = document.getElementById("result");

levelTest.addEventListener("submit", (event) => {
    event.preventDefault();

    let score = 0;
    const answers = ["q1", "q2", "q3", "q4", "q5"];

    answers.forEach((name) => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (checked) {
            score += Number(checked.value);
        }
    });

    const levels = [
        { max: 1, level: "A1", text: "Начальный уровень. Рекомендуем Basic и базовую грамматику." },
        { max: 2, level: "A2", text: "Элементарный уровень. Подойдёт Basic с дополнительной практикой." },
        { max: 3, level: "B1", text: "Средний уровень. Рекомендуем Pro для активного развития." },
        { max: 4, level: "B2", text: "Уверенный уровень. Pro поможет системно улучшить навыки." },
        { max: 5, level: "C1", text: "Продвинутый уровень. Можно выбрать IELTS Focus для экзаменационной цели." }
    ];

    const resultData = levels.find((item) => score <= item.max);

    result.innerHTML = `<strong>Ваш примерный уровень: ${resultData.level}</strong><br>${resultData.text}<br><small>Результат: ${score}/5. Это учебный мини-тест, а не официальный тест CEFR.</small>`;
    result.classList.add("show");
});

const signupForm = document.getElementById("signupForm");
const formMessage = document.getElementById("formMessage");

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const plan = savedPlan || JSON.parse(localStorage.getItem("englishLabPlan") || "null");

    formMessage.textContent = plan
        ? `Спасибо, ${name}! Заявка на тариф ${plan.plan} сохранена в демонстрационном режиме.`
        : `Спасибо, ${name}! Заявка сохранена в демонстрационном режиме.`;

    signupForm.reset();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
});
