import { invoices, customers, revenue, users } from '../lib/placeholder-data';


async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const url = process.env.API_URL;
      fetch(`${url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      })
  );

  return insertedUsers;
}

async function seedInvoices() {
  const insertedInvoices = await Promise.all(
    invoices.map(async (invoice) => {
      const url = process.env.API_URL;
      fetch(`${url}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoice),
      });
    })
  );

  return insertedInvoices;
}

async function seedCustomers() {
  const insertedCustomers = await Promise.all(
    customers.map(async (customer) => {
      const url = process.env.API_URL;
      fetch(`${url}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
    })
  );

  return insertedCustomers;
}

async function seedRevenue() {
  const insertedRevenue = await Promise.all(
    revenue.map(async (rev) => {
      const url = process.env.API_URL;
      fetch(`${url}/revenue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rev),
      });
    })
  );

  return insertedRevenue;

}

export async function GET() {
  try {
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    console.log('Database seeded successfully');
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.log(error);
    
    return Response.json({ error }, { status: 500 });
  }
}
