Selim Trade Center — User Settings Update

এই ZIP-এর index.html ফাইলটি আপনার GitHub Pages প্রজেক্টের পুরোনো index.html-এর জায়গায় ব্যবহার করুন।

নতুন সুবিধা:
1. Admin নতুন username/password দিয়ে কর্মী অ্যাকাউন্ট তৈরি করতে পারবেন।
2. Admin Manager / Accountant / Co-Manager পদবি এবং সক্রিয়/নিষ্ক্রিয় অবস্থা পরিবর্তন করতে পারবেন।
3. প্রত্যেক লগইন করা ব্যবহারকারী “আমার অ্যাকাউন্ট” থেকে নিজের পাসওয়ার্ড পরিবর্তন করতে পারবেন।
4. পুরোনো Admin-এর ইমেইল লগইন একই থাকবে।

গুরুত্বপূর্ণ:
- Firebase Authentication-এ Email/Password provider চালু থাকতে হবে।
- Firestore users collection-এর Rules-এ Admin-কে অন্য users document create/update করার অনুমতি থাকতে হবে।
- কর্মীদের পাসওয়ার্ড Firestore-এ সংরক্ষণ করা হয় না। Admin অন্যের পাসওয়ার্ড দেখতে বা সরাসরি বদলাতে পারবেন না।
- এই ফাইল তৈরি ও JavaScript syntax পরীক্ষা করা হয়েছে; Firebase-এ বাস্তব অ্যাকাউন্ট তৈরি/লগইন এই পরিবেশ থেকে পরীক্ষা করা সম্ভব নয়।
- পুরোনো Admin অ্যাকাউন্ট ও বিদ্যমান ডেটা অক্ষত রাখার জন্য Firebase Auth/Firestore ডেটা মুছে ফেলা বা Rules পরিবর্তন করা হয়নি।
