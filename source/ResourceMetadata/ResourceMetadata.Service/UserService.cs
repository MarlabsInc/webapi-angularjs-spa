using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ResourceMetadata.Data.Repositories;
using ResourceMetadata.Data.Infrastructure;
using ResourceMetadata.Model;

namespace ResourceMetadata.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IUnitOfWork unitOfWork;
        public UserService(IUserRepository userRepository,IUnitOfWork unitOfWork)
        {
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
        }
        public User GetUserByEmailAndPassword(string email, string password)
        {
            var users = userRepository.GetMany(user => user.Email == email && user.Password == password);
            return users.SingleOrDefault();
        }

        public User RegisterUser(User user)
        {
            user =userRepository.Add(user);
            SaveChanges();
            return user;
        }

        public User GetUserByEmail(string email)
        {
           var user = userRepository.GetMany(u => u.Email == email).FirstOrDefault();
           return user;
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }

    }

    public interface IUserService : IUnitOfWork
    {
        User GetUserByEmailAndPassword(string email, string password);
        User GetUserByEmail(string email);
        User RegisterUser(User user);

    }
}
