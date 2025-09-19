import os

def create_or_update_env():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    env_content = """# PostgreSQL
POSTGRES_DB=school_db
POSTGRES_USER=school_user
POSTGRES_PASSWORD=school_password
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Django
SECRET_KEY=django-insecure-your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
"""
    try:
        with open(env_path, 'w') as f:
            f.write(env_content)
        print(f"✅ Successfully updated {env_path}")
    except Exception as e:
        print(f"❌ Error updating .env file: {e}")
        print("\nPlease create the .env file manually with the following content:")
        print("\n" + "="*50)
        print(env_content)
        print("="*50)

if __name__ == "__main__":
    create_or_update_env()
