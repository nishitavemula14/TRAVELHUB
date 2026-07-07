import CustomerDetailsPageTemplate from "../templates/CustomerDetailsPageTemplate.jsx";
import { getAdminCustomers } from "../../services/AuthServices.js";


export default function BookedTicketCustomers() {
  const customers = getAdminCustomers().filter((customer) => customer.bookedTickets > 0);


  return <CustomerDetailsPageTemplate customers={customers} title="Booked Ticket Customers" />;
}

