import Translate from '../languageStrings/translate';
import { appIcons, appImages } from '../utilities';

// data for onBoarding screen (Static)
export const OnBoardings = [
  {
    id: 1,
    title: Translate('OnBoardingScreen.onBoardingTitle1'),
    description: Translate('OnBoardingScreen.onBoarding1'),
    image: appImages.onBoarding1,
  },
  {
    id: 2,
    title: Translate('OnBoardingScreen.onBoardingTitle2'),
    description: Translate('OnBoardingScreen.onBoarding2'),
    image: appImages.onBoarding2,
  },
  {
    id: 3,
    title: Translate('OnBoardingScreen.onBoardingTitle3'),
    description: Translate('OnBoardingScreen.onBoarding3'),
    image: appImages.onBoarding3,
  },
  {
    id: 4,
    title: Translate('OnBoardingScreen.onBoardingTitle4'),
    description: Translate('OnBoardingScreen.onBoarding4'),
    image: appImages.onBoarding4,
  },
  {
    id: 5,
    title: Translate('OnBoardingScreen.onBoardingTitle5'),
    description: Translate('OnBoardingScreen.onBoarding5'),
    image: appImages.onBoarding5,
  },
  {
    id: 6,
    title: Translate('OnBoardingScreen.onBoardingTitle6'),
    description: Translate('OnBoardingScreen.onBoarding6'),
    image: appImages.onBoarding6,
  },
];

// data for recuiring expenses screen  (Static)
export const expenseList = [
  [
    {
      id: 1,
      title: 'Housing',
      image: appImages.housing,
    },
    {
      id: 10,
      title: 'TV/Internet',
      image: appImages.internet,
    },
    {
      id: 19,
      title: 'Personal Spending',
      image: appImages.personalSpending,
    },
  ],
  [
    {
      id: 2,
      title: 'Transportation',
      image: appImages.transport,
    },
    {
      id: 11,
      title: 'Medical & Health Care',
      image: appImages.medical,
    },
    {
      id: 20,
      title: 'Travel',
      image: appImages.travel,
    },
  ],
  [
    {
      id: 3,
      title: 'Groceries',
      image: appImages.groceries,
    },
    {
      id: 12,
      title: 'Health & Fitness',
      image: appImages.fitness,
    },
    {
      id: 21,
      title: 'Vacation',
      image: appImages.vacation,
    },
  ],
  [
    {
      id: 4,
      title: 'Utilities',
      image: appImages.utilities,
    },
    {
      id: 13,
      title: 'Loan Payment',
      image: appImages.loan,
    },
    {
      id: 22,
      title: 'Home Repairs',
      image: appImages.homeRepair,
    },
  ],
  [
    {
      id: 5,
      title: 'Auto Service',
      image: appImages.service,
    },
    {
      id: 14,
      title: 'Dining Out',
      image: appImages.dining,
    },
    {
      id: 23,
      title: 'Home Supplies',
      image: appImages.supplies,
    },
  ],
  [
    {
      id: 6,
      title: 'Charity',
      image: appImages.charity,
    },
    {
      id: 15,
      title: 'Education',
      image: appImages.education,
    },
    {
      id: 24,
      title: 'Pet Expense',
      image: appImages.petExpense,
    },
  ],
  [
    {
      id: 7,
      title: 'Child Expense',
      image: appImages.childExpense,
    },
    {
      id: 16,
      title: 'Fuel',
      image: appImages.fuel,
    },
    {
      id: 25,
      title: 'Phone',
      image: appImages.phone,
    },
  ],
  [
    {
      id: 8,
      title: 'Clothing',
      image: appImages.clothing,
    },
    {
      id: 17,
      title: 'Gift',
      image: appImages.gift,
    },
    {
      id: 26,
      title: 'Entertainment',
      image: appImages.entertainment,
    },
  ],
  [
    {
      id: 9,
      title: 'Taxes',
      image: appImages.taxes,
    },
    {
      id: 18,
      title: 'Miscellaneous',
      image: appImages.miscellaneous,
    },
  ],
]

// data for expenses
export const dummyExpenses = [{
  id: 1,
  ExpenseName: 'Mortage/Rent',
  ExpenseFrequency: 'Semi-Monthly',
  ExpenseDate: '24th Dec',
  ExpenseAmount: '200'
},
{
  id: 2,
  ExpenseName: 'Mortage/Rent',
  ExpenseFrequency: 'Monthly',
  ExpenseDate: '-',
  ExpenseAmount: '200'
},
{
  id: 3,
  ExpenseName: 'Mortage/Rent',
  ExpenseFrequency: 'Bi-Weekly',
  ExpenseDate: '24th Dec',
  ExpenseAmount: '200'
},
{
  id: 4,
  ExpenseName: 'Mortage/Rent',
  ExpenseFrequency: 'Weekly',
  ExpenseDate: '24th Dec',
  ExpenseAmount: '200'
},
{
  id: 5,
  ExpenseName: 'Mortage/Rent',
  ExpenseFrequency: 'Monthly',
  ExpenseDate: '24th Dec',
  ExpenseAmount: '200'
},
]

// data for debts
export const dummyDebts = [{
  id: 1,
  DebtName: 'Mortage/Rent',
  DebtAmount: '$ 2,000'
},
{
  id: 2,
  DebtName: 'Mortage/Rent',
  DebtAmount: '$ 2,000'
},
{
  id: 3,
  DebtName: 'Mortage/Rent',
  DebtAmount: '$ 2,000'
},
{
  id: 4,
  DebtName: 'Mortage/Rent',
  DebtAmount: '$ 2,000'
},
{
  id: 5,
  DebtName: 'Mortage/Rent',
  DebtAmount: '$ 2,000'
},
]

// data for debts
export const dummyNotifications = [{
  id: 1,
  notificationText: 'Budget Overdrawn.',
  notificationTime: '56 minutes ago'
},
{
  id: 2,
  notificationText: 'Carry Over $x amount, next budget cycle will be insufficient to cover expenses.',
  notificationTime: '56 minutes ago'
},
{
  id: 3,
  notificationText: 'Income was added to 12/9/2022 budget’.',
  notificationTime: '56 minutes ago'
},
{
  id: 4,
  notificationText: 'Money added from ‘Job 2 Income’ for 12/19/2022 budget.',
  notificationTime: '56 minutes ago'
}
]

// data for profile screen
export const ProfileScreenData = [
  {
    id: 1,
    title: 'Passcode',
    icon: 'lock'
  },
  {
    id: 2,
    title: 'Face ID',
    imageName: appIcons.faceId
  },
  {
    id: 3,
    title: 'Reminders',
    imageName: appIcons.notifications
  },
]


// Languages (Static)
export const Languages = ['English', 'Español', 'Français', 'Italiano', 'Português', 'Русский', 'Deutsch', 'Dutch', '國語']

// Currencies (Static)
export const Currencies = ['US Dollar', 'British Pound Sterling', 'Brazilian Real', 'Russian Ruble', 'Nederlands', 'Euro', 'Chinese Yuan Renminbi', 'Argentine Peso', 'Bolivian Boliviano',
  'Chilean Peso', 'Colombian Peso', 'Costa Rican Colon', 'Cuban Peso', 'Cuban Convertible Peso', 'Dominican Peso', 'Central African CFA Franc', 'Guatemalan Quetzal',
  'Honduran Lempira', 'Mexican Peso', 'Nicaraguan Cordoba', 'Panamanian Balboa', 'Paraguayan Guarani', 'Peruvian Sol', 'Uruguayan Peso', 'Venezuelan Bolivar Soberano']

// tooltips text (static)
export const ToolTiopsText = {
  text1: 'Tap here to select a different Currency',
  text2: 'The auto fill feature will automatically populate savings or debt with remaining leftover income after all expenses are paid for each budget cycle.',
  text3: 'This is the minimum amount to keep in your account after expenses. Auto fill will input remaining income over this amount to savings or debt. This amount should be minimal as all expenses and personal spending will be accounted for.',
  text4: 'Input your total current savings',
  text5: 'Select whether your budget will have single or multiple income sources.',
  text6: 'A fixed income is a paycheck that does not change. A variable income is a paycheck that may change from check to check. For example, a salaried job would be a fixed income and a sales job would be variable income.',
  text7: 'Select the pay frequency for the income source',
  text8: 'Select the next date you will be receive a paycheck. The budget cycle will begin on this date and will move forward based on the chosen pay frequency.',
  text9: 'Click and drag any additional income up to replace as your primary income source. The primary income source will be used to create the budget cycles based on the pay frequency selected.',
  text10: 'Tap here to remove this Additional Income',
  text11: 'Tap here to select Category of Expense',
  text12: 'Tap here to select the next payment due',
  text13: 'Tap here to edit the list of expenses and debt',
  text14: 'Swipe left to edit the expense or debt amount',
  text15: 'Select the radio buttons to delete one or more expenses or debt',
  text16: 'Click and drag up or down to change the priority of each debt. The debt in the top position will be the highest priority. Our auto fill feature will focus on paying this debt off first and auto populate any remaining income toward this debt each budget cycle.',
  text17: 'Tap here to change the income for the current budget or to edit the current budget details',
  text18: 'Tap here to switch the current budget',
  text19: 'Tap here to add an additional income, a one time expense or create a new budget',
  text20: 'Tap here to view your profile and settings as well as upgrade your account.',
  text21: 'For one time expense, swipe to delete',
  text22: 'Tap the pencil to edit this amount',
  text23: 'Tap to enter amount to pay toward debt.',
  text24: 'Displays the total amount for each individual debt. Each payment towards debt will subtract and recalculate the new debt total on every budget cycle. This will ONLY subtract from the principal amount and will not account for any added interest.',
  text25: 'Tap the pencil to add an amount to save.',
  text26: 'Tap the pencil to add an amount to be carried over from this budget cycle to the next',
  text27: 'Tap here to Edit Total Savings, Edit Savings Goal, and Select date to view projected savings',
  text28: 'Tap here to change the month for overview',
  text29: 'Tap here to view detailed expenses for the month and display a break down for expenses within each category.',
  text30: 'Tap here to expand to view all debt details.',
  text31: 'Tap here to change the selected debt and view the projected pay off date',
  text32: 'Swipe Left to delete this notification',
}