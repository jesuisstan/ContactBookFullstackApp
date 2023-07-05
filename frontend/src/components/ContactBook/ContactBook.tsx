import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import * as utils from '../../utils/contactsHandlers';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';
import FloatingButton from '../Layout/FloatingButton';

const ContactBook = ({ user }: { user: User }) => {
  const [renderingTrigger, setRenderingTrigger] = useState(0);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (user.provider) utils.getAllContacts({ user, setAllContacts });
  }, [user, renderingTrigger]);

  return (
    <>
      <ContactForm
        open={contactFormOpen}
        setOpen={setContactFormOpen}
        user={user}
        setRenderingTrigger={setRenderingTrigger}
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '21px'
        }}
      >
        <FloatingButton onClick={() => setContactFormOpen(true)} />
        {allContacts.map((contact) => (
          <div key={contact._id} style={{ flex: '0 0 calc(20% - 10.5px)' }}>
            <ContactCard
              user={user}
              contact={contact}
              setRenderingTrigger={setRenderingTrigger}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactBook;
