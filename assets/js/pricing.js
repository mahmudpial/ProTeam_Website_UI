/**
 * Professional Pricing Logic
 */
function initPricing() {
  const toggler = document.getElementById("price-toggler");
  const dot = toggler.querySelector(".toggle-dot");

  // Elements to update
  const starterAmount = document.getElementById("starter-amount");
  const proAmount = document.getElementById("pro-amount");
  const starterPeriod = document.getElementById("starter-period");
  const proPeriod = document.getElementById("pro-period");
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");

  const prices = {
    monthly: { starter: "$29", pro: "$79", period: "/mo" },
    yearly: { starter: "$240", pro: "$660", period: "/yr" },
  };

  let isYearly = false;

  toggler.addEventListener("click", () => {
    isYearly = !isYearly;

    // UI Toggler Animation
    dot.style.transform = isYearly ? "translateX(2rem)" : "translateX(0)";
    toggler.classList.toggle("bg-indigo-600", isYearly);
    toggler.classList.toggle("bg-gray-300", !isYearly);

    // Labels Highlight
    monthlyLabel.classList.toggle("text-gray-900", !isYearly);
    monthlyLabel.classList.toggle("font-bold", !isYearly);
    monthlyLabel.classList.toggle("text-gray-500", isYearly);

    yearlyLabel.classList.toggle("text-gray-900", isYearly);
    yearlyLabel.classList.bold = isYearly;
    yearlyLabel.classList.toggle("text-gray-500", !isYearly);

    // Animate price numbers
    [starterAmount, proAmount].forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "scale(0.95)";
    });

    setTimeout(() => {
      const mode = isYearly ? "yearly" : "monthly";
      starterAmount.innerText = prices[mode].starter;
      proAmount.innerText = prices[mode].pro;
      starterPeriod.innerText = prices[mode].period;
      proPeriod.innerText = prices[mode].period;

      [starterAmount, proAmount].forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
        el.style.transition = "all 0.3s ease";
      });
    }, 150);
  });
}
