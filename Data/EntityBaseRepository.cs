using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using signalr_test.Models;

namespace signalr_test.Data
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T>
        where T : class, IEntityBase, new()
    {
        IEnumerable<T> _entities;
        public EntityBaseRepository(IEnumerable<T> entities)
        {
            _entities = entities;
        }
        public void Add(T entity)
        {
            _entities = _entities.Concat(new [] { entity });
        }

        public IEnumerable<T> AllIncluding(params Func<T, bool>[] includeProperties)
        {
            IEnumerable<T> entities = _entities;
            foreach (var includeProperty in includeProperties)
            {
                entities = entities.Where(includeProperty);
            }
           return entities;
        }

        public void Commit()
        {
            throw new NotImplementedException();
        }

        public int Count()
        {
            return _entities.Count();
        }

        public void Delete(T entity)
        {
            _entities = _entities.Except(new[] { entity });
        }

        public void DeleteWhere(Func<T, bool> predicate)
        {
            IEnumerable<T> entities = _entities.Where(predicate);
            _entities = _entities.Except(entities);
        }

        public IEnumerable<T> FindBy(Func<T, bool> predicate)
        {
            return _entities.Where(predicate);
        }

        public IEnumerable<T> GetAll()
        {
            return _entities;
        }

        public T GetSingle(int id)
        {
            return _entities.FirstOrDefault(x => x.Id == id);
        }

        public T GetSingle(Func<T, bool> predicate)
        {
            return _entities.FirstOrDefault(predicate);
        }

        public void Update(T entity)
        {
            var ent = _entities.FirstOrDefault(x => x.Id == entity.Id);
            _entities = _entities.Except(new[] { ent });
            _entities = _entities.Concat(new[] { entity });
        }
    }
}