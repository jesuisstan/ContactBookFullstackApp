import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import FloatingButton from '../Layout/FloatingButton';
import PleaseLogin from '../../pages/PleaseLogin';
import * as utils from '../../utils/contactsHandlers';
import SearchBar from './SearchBar';

const ContactBook = ({ user }: { user: User }) => {
  const [renderingTrigger, setRenderingTrigger] = useState(0);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [searchResult, setSearchResult] = useState<Contact[]>([]);

  useEffect(() => {
    if (user.provider) utils.getAllContacts({ user, setAllContacts });
  }, [user, renderingTrigger]);

  return !user.provider ? (
    <PleaseLogin />
  ) : (
    <>
      <ContactForm
        open={contactFormOpen}
        setOpen={setContactFormOpen}
        user={user}
        setRenderingTrigger={setRenderingTrigger}
      />

      <SearchBar contacts={allContacts} setSearchResult={setSearchResult} />

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
