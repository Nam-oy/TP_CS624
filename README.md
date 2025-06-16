CS624:TeamProject


🐾 Pet Manager React Native App
A mobile app built with React Native to manage pets, add and track tasks, and view activity history. Connects to a backend REST API for data storage.


📋 Overview
Manage pet profiles (Add, Edit, Delete)
Add and track tasks for each pet
View history of completed activities per pet

🔄 App Features & Flow

1️⃣ PetProfileScreen (Manage Pets)
    ➡️ Input
        - 📝 User inputs pet info: Name, Species, Age
        - 🔘 Buttons tapped: Add Pet, Update Pet, Edit, Delete, Cancel
        - 🌐 Backend API calls for pets (GET, POST, PATCH, DELETE)
    ⚙️ Process
        - 🔄 Fetch pets list on screen load
        - ➕ Add pet via POST
        - ✏️ Update pet via PATCH
        - ❌ Delete pet via DELETE
        - 📝 Toggle form visibility
        - 🔄 Populate form for editing
    🎯 Output
        - 📃 Display list of pets with details
        - 🔘 Buttons: Task, History, Edit, Delete
        - 🛠️ Form for adding/updating pets

2️⃣ Task Management (Add/View Tasks)
    ➡️ Input
        -📝 User adds task details: Activity, Description, Date/Time, Status
        - 🐾 Selected pet ID
        - 🌐 Backend API for tasks
    ⚙️ Process
        - 🔄 Fetch, add, update, delete tasks for pet
        - 🔍 Filter tasks by pet and status
    🎯 Output
        - 📃 List tasks per pet
        - ➕ Add or edit task entries

3️⃣ HistoryScreen (Completed Tasks)
    ➡️ Input
        - 📍 Route params: petId, petName
        - 🌐 API call for all tasks

    ⚙️ Process
        - 🔍 Filter completed tasks for pet
        - 🕒 Format timestamp and task details

    🎯 Output
        - 📜 Scrollable list of completed activities
        - ❗ Show message if no history exists

🔄 How to Use
    - 📲 Open app.
    - 🐕 Manage pets: Add, Edit, Delete.
    - ✅ Manage tasks linked to pets.
    - 🕰️ View completed task history.

⚙️ Technical Details
    - ⚛️ React Native Functional Components + Hooks
    - 🎨 Styling with StyleSheet
    - 🔀 Navigation with React Navigation (assumed)
    - 🌐 REST API (GET, POST, PATCH, DELETE)
    - 🚀 Async fetch with fetch()

🔍 Input → Process → Output Summary
    Screen	➡️ Input	⚙️ Process	🎯 Output
    PetProfileScreen	🐾 Pet data, user button taps	API fetch/add/update/delete, form	🐕 List pets, add/edit form
    Task Screen	📝 Task data, pet selected	API fetch/add/update tasks	✅ Task list, add/edit form
    HistoryScreen	📍 petId, petName	Filter completed tasks, format data	🕰️ Completed task list

🛠️ Setup & Configuration
    - 🖥️ Update API URLs to backend server IP/port.
    - 🛠️ Ensure backend supports API endpoints.
    - 📱 Run app on device/emulator with network access.
    - 📦 Install dependencies (npm install).
    - 🚀 Launch app (npx react-native run-android / run-ios).