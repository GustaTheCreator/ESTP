# ESTP

ligar o ambiente virtual

```bash
.\eb-virt\Scripts\activate   
```

correr backend

```bash

cd gbank
python manage.py runserver
```

correr frontend

```bash
cd gbank/frontend/my-app
npm start
```

### Arquitetura

```plaintext
estp/
├── README.md
├── .devcontainer/
├── eb-virt/
│   └── Scripts/
│       └── activate
├── AWS/
│   ├── lamdafunctions/
│   │   ├── calculate_credit_score.py
│   │   ├── process_loan_request.py
│   │   ├── schedule_interview.py
│   │   ├── send_notification.py
│   │   └── validate_documents.py
│   └── stepfunctions/
│       └── stepfunction.json
└── gbank/
    ├── api/
    │   ├── __init__.py
    │   ├── views.py
    │   ├── serializer.py
    │   └── urls.py
    ├── base/
    │   ├── __init__.py
    │   ├── models.py
    ├── gbank/
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   ├── asgi.py
    │   └── views.py
    ├── frontend/
    │   └── my-app/
    │       ├── public/
    │       │   ├── index.html
    │       │   ├── manifest.json
    │       │   └── robots.txt
    │       ├── src/
    │       │   ├── components/
    │       │   │   ├── Style/
    │       │   │   │   ├── Header.css
    │       │   │   │   ├── Footer.css
    │       │   │   │   └── Navbar.css
    │       │   │   ├── Header.js
    │       │   │   ├── Footer.js
    │       │   │   └── Navbar.js
    │       │   ├── pages/
    │       │   │   ├── Style/
    │       │   │   │   ├── Home.css
    │       │   │   │   ├── LoanRequests.css
    │       │   │   │   └── Login.css
    │       │   │   ├── Home.js
    │       │   │   ├── LoanRequests.js
    │       │   │   └── Login.js
    │       │   ├── App.js
    │       │   ├── App.css
    │       │   ├── App.test.js
    │       │   ├── index.js
    │       │   ├── index.css
    │       │   ├── logo.svg
    │       │   ├── reportWebVitals.js
    │       │   └── setupTests.js
    │       ├── .gitignore
    │       ├── package.json
    │       ├── package-lock.json
    │       └── README.md
    ├── debug.log
    └── manage.py
    ```