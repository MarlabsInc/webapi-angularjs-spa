using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ResourceMetadata.Data.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        T GetById(int id);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetMany(Expression<Func<T, bool>> where);
        T Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        IQueryable<T> Query(Expression<Func<T, bool>> where);
    }

}
