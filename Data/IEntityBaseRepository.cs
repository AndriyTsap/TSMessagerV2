using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using signalr_test.Models;

namespace signalr_test.Data
{
    public interface IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        IEnumerable<T> AllIncluding(params Func<T, bool>[] includeProperties);
        IEnumerable<T> GetAll();
        int Count();
        T GetSingle(int id);
        T GetSingle(Func<T, bool> predicate);
        IEnumerable<T> FindBy(Func<T, bool> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteWhere(Func<T, bool> predicate);
        void Commit();
    }
}
