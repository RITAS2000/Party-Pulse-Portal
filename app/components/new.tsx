// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   PointerSensor,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";

// function TwoLists() {
//   const [available, setAvailable] = useState(["char1", "char2"]);
//   const [team, setTeam] = useState(["char3"]);

//   const sensors = useSensors(useSensor(PointerSensor));

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const source = active.data.current.sortable.containerId;
//     const destination = over.data.current?.sortable.containerId;

//     if (source === destination) {
//       // reorder
//       if (source === "available") {
//         const oldIndex = available.indexOf(active.id);
//         const newIndex = available.indexOf(over.id);
//         setAvailable(arrayMove(available, oldIndex, newIndex));
//       } else {
//         const oldIndex = team.indexOf(active.id);
//         const newIndex = team.indexOf(over.id);
//         setTeam(arrayMove(team, oldIndex, newIndex));
//       }
//     } else {
//       // move between lists
//       if (source === "available") {
//         const char = available.find((c) => c === active.id);
//         setAvailable(available.filter((c) => c !== active.id));
//         setTeam([...team, char]);
//       } else {
//         const char = team.find((c) => c === active.id);
//         setTeam(team.filter((c) => c !== active.id));
//         setAvailable([...available, char]);
//       }
//     }
//   };

//   return (
//     <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <div className="flex gap-10">
//         <SortableContext id="available" items={available} strategy={verticalListSortingStrategy}>
//           <ul>{available.map(id => <li key={id}>{id}</li>)}</ul>
//         </SortableContext>

//         <SortableContext id="team" items={team} strategy={verticalListSortingStrategy}>
//           <ul>{team.map(id => <li key={id}>{id}</li>)}</ul>
//         </SortableContext>
//       </div>
//     </DndContext>
//   );
// }










// Notification API + Service Worker (Push Notifications)

// Щоб сповіщення приходили навіть коли вкладка закрита, потрібні Push Notifications через Service Worker.

// Короткий опис:

// Реєструєш Service Worker на сайті:

// // public/sw.js
// self.addEventListener('push', event => {
//   const data = event.data.json();
//   event.waitUntil(
//     self.registration.showNotification(data.title, {
//       body: data.body,
//       icon: data.icon,
//     })
//   );
// });


// Запитуєш дозвіл у користувача:

// Notification.requestPermission().then(permission => {
//   if (permission === "granted") {
//     console.log("Дозвіл на сповіщення отримано!");
//   }
// });


// Відправляєш push-повідомлення з сервера через Web Push Protocol (наприклад, через Node.js та бібліотеку web-push).

// ✅ Плюси:

// Повідомлення приходять навіть коли вкладка закрита.

// Можна показувати їх у системі користувача.

// ❌ Мінуси:

// Потрібен бекенд, який відправляє пуші.

// Користувач має дозволити сповіщення.
















// {
//   "_id": "userCharacterId",
//   "userId": "id гравця",
//   "nickname": "123",
//   "level": 12,
//   "race": "druid",
//   "avatar": "url",
//   "createdAt": "...",
//   "updatedAt": "...",
//   "showInGallery": false
// }
// Колекція галереї (для адміна)
// json
// Копировать код
// {
//   "_id": "galleryCharacterId",
//   "originalCharacterId": "userCharacterId",
//   "userId": "id гравця",
//   "nickname": "123",
//   "level": 12,
//   "race": "druid",
//   "avatar": "url",
//   "isApproved": false,
//   "createdAt": "...",
//   "updatedAt": "..."
// }
// Тобто ми робимо “копію” персонажа у галерею, яку спочатку треба підтвердити.

// 2️⃣ API-ендпоінти
// 2.1 Пуш у галерею (гравець натискає “показати”)
// ts
// Копировать код
// app.post('/gallery/push', auth, async (req, res) => {
//   const { characterId } = req.body;

//   const character = await CharactersCollection.findOne({ _id: characterId, userId: req.user.id });
//   if (!character) return res.status(404).json({ message: "Character not found" });

//   const galleryEntry = await GalleryCollection.create({
//     originalCharacterId: character._id,
//     userId: character.userId,
//     nickname: character.nickname,
//     level: character.level,
//     race: character.race,
//     avatar: character.avatar,
//     isApproved: false
//   });

//   res.status(201).json(galleryEntry);
// });
// 2.2 Перегляд чернеток для адміна
// ts
// Копировать код
// app.get('/gallery/pending', authAdmin, async (req, res) => {
//   const pending = await GalleryCollection.find({ isApproved: false });
//   res.json(pending);
// });
// 2.3 Підтвердження адміном
// ts
// Копировать код
// app.post('/gallery/approve/:id', authAdmin, async (req, res) => {
//   const entry = await GalleryCollection.findById(req.params.id);
//   if (!entry) return res.status(404).json({ message: "Gallery entry not found" });

//   entry.isApproved = true;
//   await entry.save();
//   res.json(entry);
// });
// 3️⃣ React UI (для гравця)
// tsx
// Копировать код
// <button
//   onClick={() => pushToGallery(character._id)}
//   disabled={character.showInGallery}
// >
//   {character.showInGallery ? "В очікуванні підтвердження" : "Показати у галереї"}
// </button>
// ts
// Копировать код
// const pushToGallery = async (charId: string) => {
//   await fetch("/gallery/push", {
//     method: "POST",
//     body: JSON.stringify({ characterId: charId }),
//     headers: { "Content-Type": "application/json" }
//   });
//   setCharacter(prev => ({ ...prev, showInGallery: true }));
// };
// 4️⃣ React UI (для адміна)
// tsx
// Копировать код
// {pendingGallery.map(entry => (
//   <div key={entry._id}>
//     <p>{entry.nickname}</p>
//     <button onClick={() => approve(entry._id)}>Підтвердити</button>
//   </div>
// ))}

// const approve = async (id: string) => {
//   await fetch(`/gallery/approve/${id}`, { method: "POST" });
//   setPendingGallery(prev => prev.filter(e => e._id !== id));
// };
// ✅ Логіка
// Користувач натискає “показати у галереї” → копія персонажа пушиться в галерею, isApproved = false.

// Адмін бачить чернетки → натискає “підтвердити” → isApproved = true.

// Публічна галерея показує тільки isApproved = true.