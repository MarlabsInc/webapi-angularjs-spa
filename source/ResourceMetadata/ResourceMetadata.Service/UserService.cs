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
     

        public ApplicationUser RegisterUser(ApplicationUser user)
        {
            user =userRepository.Add(user);
            SaveChanges();
            return user;
        }

        public ApplicationUser GetUserByEmail(string email)
        {
           var user = userRepository.GetMany(u => u.Email == email).FirstOrDefault();
           return user;
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }

    }

    public interface IUserService
    {
        ApplicationUser GetUserByEmail(string email);
        ApplicationUser RegisterUser(ApplicationUser user);

    }
}
