# ✨ EasyDerma – Personalized AI-Powered Skincare Guidance

## 🧠 Inspiration

Many of us struggled with acne growing up, navigating a sea of online misinformation and influencer-driven marketing. Products were promoted without transparency, while effective, affordable options were often overlooked. This impacted not just our skin, but our self-confidence and engagement with the world.

**EasyDerma** challenges the idea that acne is just a natural, unavoidable phase—and aims to give people clarity, confidence, and control.

## 💡 What It Does

Users upload a facial image, and EasyDerma's custom-trained AI model diagnoses visible skin conditions. A second opinion is generated via the **Gemini API** to confirm the analysis. Based on this consensus, EasyDerma generates:

* A **personalized skincare routine** (AM & PM)
* **Product recommendations** with Amazon links
* **Usage instructions** and explanations
* **Dietary tips** to support skin health holistically

## 🛠️ How We Built It

* **Frontend:** Next.js with React and TypeScript
* **Authentication:** Auth0 for secure user login
* **Backend:** Flask connected to MongoDB
* **ML Model:** Custom CNN trained on a Kaggle dataset of 27,000+ dermatological images
* **AI Services:** Gemini API integration for second-opinion diagnostics

The CNN includes 6 convolutional layers with max pooling and data augmentation to improve accuracy and reduce overfitting using TensorFlow and Keras.

## 🧩 Challenges We Faced

* Managing dataset inconsistencies
* Hardware constraints for model training
* Integrating AI results with dynamic UI
* Storing and retrieving image data effectively

## 🏆 Accomplishments

* Built and trained a custom CNN from scratch
* Created a synced, cross-platform experience using MongoDB
* Integrated live diagnosis + product suggestions in a clean and interactive UI

## 📚 What We Learned

* The practical limitations of applied machine learning
* Hands-on experience with Next.js and full-stack integration
* Implementation of Auth0 for secure flows

## 🛠️ Built With

* `nextjs`
* `react`
* `typescript`
* `javascript`
* `flask`
* `mongodb`
* `auth0`
* `gemini`
* `tensorflow / keras`

---

## 📬 Contact

* GitHub: [@SecretariatV](https://github.com/SecretariatV)
* Email: [oliver.b25.f@gmail.com](mailto:oliver.b25.f@gmail.com)
* Telegram: [@ares\_orb](https://t.me/ares_orb)
* Twitter (X): [@OVB\_Coder](https://x.com/OVB_Coder)
