- [x] see why refreshing the page changes the dates by printing out the dates
- [x] complete the functions to show stat ranges for weight, height and generation
- find font for logo
- finish how to play modal

- change game over to be a gameWon and gameLost state ( what will this actually accomplish (Game can sometimes run into errors where it shows game lost even though the player guessed correctly. Individual win/lost state would get rid of this error) ). Have a gameOverAtom update if gameWon or gameLost is true
- find way to prevent incrementing id on fail ( prevent db action from firing on build, prevent route from being able to be access at anytime, prevent prisma from updating count on fail)
- [x] have the mode reflected in the url for eg /whosthatpokemon?mode=unlimited. Should allow staying on same tab on refresh. Should begin helping to simplify code and prevent repetition.
  - [x] refreshing on unlimited mode results in pokemon to guess being null
  - [x] the pokemon generated when the gameStarts isn't immediately saved to localStorage so it keeps generating a new pokemon and breaking the game
- [x] dailyAtom was used in the share component to get the id, I can either store the id as an atom or hydrateDailyAtom from server
- rendering date on server recreates 8pm
- [x] move isn't setup with new setup so it currently breaks

**Things that absolutely need to be fixed before it's ready to be used by others**

- [x] Don't show new answer briefly when clicking new game
- [x] Don't show game lost when getting it right on the last guess
- [ ] Images need to load faster
- [ ] All buttons and links should have some visual change when hover
- [x] Add a tooltip to icons and to pokemon images
- [ ] Create a background for who's that pokemon and for pokemon image tile
- [x] Make "Test your knowledge" bigger
- [ ] find a way to make images grow to take up full container

- [ ] game over should not be a modal. It should either replace to add on to the content on screen so that the user doesn't have to constantly close a modal

- [ ] replace react-tooltip, react-day-picker, headlessui/react, headlessui/tailwindcss with react-aria and tailwindcss-react-aria-components
- [ ] fix wsl2 turning off server randomly

- [ ] make pokemon tiles focusable so I don't have to render a button inside to use tooltip
- [ ] find a better system for rendering the tiles so that I can enable scroll, they don't randomly change size and can be dynamically resized
- [ ] fix error happening with unlimited mode
- [ ] create calendar component and then begin styling the react aria components using tailwind and maybe framer motion
- [ ] create an additional combobox component that will likely handle the filtering as well as submitting data etc

- [ ] I might actually not need the base react aria package

TODO In Order 4/16

- [ ] Define Style Guide and Color Scheme
- [ ] Create css variables for color scheme
- [ ] Add tailwind-variants ( allows for easier copying of classes from baselayer and the slots make it easier to style certain components) or keep cva
- [ ] update UI base components to implement this style guide with multiple variants
- [ ] add other needed components

- I temporarily just copied all the button code over for places where buttonVariants were used. Mainly for links. I need to create a link component for these instances
- I had to add twMerge false to tv because it was getting rid of custom text shadow

- There is no scroll in content on mobile
- there is no autofocus for combobox
- I am thinking about potentially hiding navbar on mobile but I would need to use router.replace or something so users are stuck on page because they clicked too much
- dialog should open more to top of screen instead of center
